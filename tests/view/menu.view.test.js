import { describe, it, expect, vi, beforeEach } from "vitest";
import Backbone from "backbone";
import $ from "jquery";

import MenuView from "../../src/app/views/menu/menu.view.js";

describe("MenuView", () => {
    let collection;
    let model;
    let contentView;
    let tabsCollection;
    let menuView;

    beforeEach(() => {
        document.body.innerHTML = "<div id=\"menu\"></div><div id=\"content\"></div>";

        collection = new Backbone.Collection([
            { key: "products", label: "Products" },
            { key: "customers", label: "Customers" }
        ]);

        model = new Backbone.Model({ menu: "products", tab: "" });

        contentView = { $el: $("#content"), empty: vi.fn(() => $("#content").empty()) };
        tabsCollection = { setMenu: vi.fn().mockResolvedValue([{ key: "tab1" }]) };

        menuView = new MenuView({ collection, model, contentView, tabsCollection });
    });

    it("renders menu with active item", async () => {
        await menuView.render();
        const html = $("#menu").html();
        expect(html).toContain("Products");
        expect(html).toContain("Customers");
    });

    it("handles menu click: updates model, clears contentView, calls tabsCollection.setMenu", async () => {
        await menuView.render();

        const event = { currentTarget: { dataset: { key: "customers" } } };

        await menuView.onMenuClick(event);

        expect(model.get("menu")).toBe("customers");
        expect(model.get("tab")).toBe("");
        expect(model.get("collapsed")).toEqual([]);

        expect($("#content").html()).toBe("");

        expect(tabsCollection.setMenu).toHaveBeenCalledWith("customers");
    });
});
