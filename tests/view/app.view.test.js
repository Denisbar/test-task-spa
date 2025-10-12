import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AppView from "../../src/app/views/app/app.view.js";
import stateModel from "../../src/app/models/state.model.js";
import BlocksCollection from "../../src/app/collections/blocks.collection.js";
import MenusCollection from "../../src/app/collections/menus.collection.js";
import TabsCollection from "../../src/app/collections/tabs.collection.js";
import Backbone from "backbone";

describe("AppView", () => {
    let appView;

    beforeEach(() => {
        vi.spyOn(MenusCollection.prototype, "fetchMenus").mockResolvedValue([]);
        vi.spyOn(TabsCollection.prototype, "setMenu").mockResolvedValue([]);
        vi.spyOn(BlocksCollection.prototype, "setTab").mockResolvedValue([]);

        document.body.innerHTML = "<div id=\"app\"></div>";

        stateModel.set({ menu: "products", tab: "overview", collapsed: [] });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        stateModel.set({ menu: "", tab: "", collapsed: [] });
    });

    it("initializes correctly with collections and child views", async () => {
        appView = new AppView();
        await appView.initialize();

        expect(appView.blocks).toBeInstanceOf(BlocksCollection);
        expect(appView.menus).toBeInstanceOf(MenusCollection);
        expect(appView.tabsCollection).toBeInstanceOf(TabsCollection);

        expect(appView.contentView).toBeDefined();
        expect(appView.menuView).toBeDefined();
        expect(appView.tabView).toBeDefined();
    });

    it("onStateChange calls setTab and renderBlocks when menu and tab set", async () => {
        appView = new AppView();
        await appView.initialize();

        const renderBlocksSpy = vi.spyOn(appView.contentView, "renderBlocks").mockImplementation(() => {});

        await appView.onStateChange();

        expect(appView.blocks.setTab).toHaveBeenCalledWith("products", "overview");
        expect(renderBlocksSpy).toHaveBeenCalled();
    });

    it("onStateChange sets tab if not selected", async () => {
        appView = new AppView();
        await appView.initialize();

        stateModel.set({ menu: "products", tab: "" });

        const MockTabModel = Backbone.Model.extend({});
        vi.spyOn(TabsCollection.prototype, "setMenu").mockImplementation(async function(menu) {
            this.reset([new MockTabModel({ key: "overview", menuKey: menu })]);
            return this.models;
        });

        await appView.onStateChange();

        expect(stateModel.get("tab")).toBe("overview");
    });

    it("render calls child views render with correct arguments", () => {
        appView = new AppView();

        appView.contentView = { render: vi.fn() };
        appView.menuView = { render: vi.fn() };
        appView.tabView = { render: vi.fn() };

        stateModel.set({ menu: "products", tab: "overview", collapsed: ["b1"] });

        appView.render();

        expect(appView.contentView.render).toHaveBeenCalledWith("products", "overview", ["b1"]);
        expect(appView.menuView.render).toHaveBeenCalledWith("products");
        expect(appView.tabView.render).toHaveBeenCalledWith("products", "overview");
    });

    it("handles errors in onStateChange gracefully", async () => {
        appView = new AppView();
        await appView.initialize();

        vi.spyOn(appView.blocks, "setTab").mockRejectedValue(new Error("Test error"));

        await appView.onStateChange();

        expect(document.querySelector("#app").innerHTML).toContain("Error loading content");
    });
});
