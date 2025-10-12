import { describe, it, expect, vi, beforeEach } from "vitest";
import Backbone from "backbone";
import $ from "jquery";
import stateModel from "../../src/app/models/state.model.js";

import TabView from "../../src/app/views/tabs/tab.view.js";

describe("TabView", () => {
    let collection;
    let tabView;

    beforeEach(() => {
        document.body.innerHTML = "<div id=\"tabs\"></div>";

        collection = new Backbone.Collection([
            { key: "tab1", label: "Tab 1", menuKey: "products" },
            { key: "tab2", label: "Tab 2", menuKey: "products" }
        ]);

        stateModel.set({ menu: "products", tab: "" });

        tabView = new TabView({ collection });
    });

    it("renders tabs with activeTab", async () => {
        stateModel.set({ tab: "tab1" });
        await tabView.render("products", "tab1");
        const html = $("#tabs").html();

        expect(html).toContain("Tab 1");
        expect(html).toContain("Tab 2");
    });

    it("renders tabs on collection reset", async () => {
        const renderSpy = vi.spyOn(tabView, "render");
        collection.trigger("reset");
        expect(renderSpy).toHaveBeenCalled();
        renderSpy.mockRestore();
    });

    it("updates stateModel on tab click", async () => {
        const event = { currentTarget: { dataset: { tab: "tab2" } } };
        tabView.onTabClick(event);

        expect(stateModel.get("tab")).toBe("tab2");
        expect(stateModel.get("collapsed")).toEqual([]);
    });

    it("does not render if menu is not defined", async () => {
        await tabView.render("", "tab1");
        const html = $("#tabs").html();
        expect(html).toBe("");
    });
});
