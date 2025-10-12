import { describe, it, expect, vi, beforeEach } from "vitest";
import Router from "../../src/app/router/router.js";
import stateModel from "../../src/app/models/state.model.js";

describe("Router.showApp", () => {
    let router;

    beforeEach(() => {
        router = new Router();

        router.appView.render = vi.fn();

        stateModel.set = vi.fn();
    });

    it("sets state and calls appView.render with collapse ids", () => {
        router.showApp("products", "overview", "collapse=a,b,c");

        expect(stateModel.set).toHaveBeenCalledWith({
            menu: "products",
            tab: "overview",
            collapsed: ["a", "b", "c"]
        });

        expect(router.appView.render).toHaveBeenCalled();
    });

    it("handles empty collapse query", () => {
        router.showApp("products", "overview", "");

        expect(stateModel.set).toHaveBeenCalledWith({
            menu: "products",
            tab: "overview",
            collapsed: []
        });

        expect(router.appView.render).toHaveBeenCalled();
    });

    it("handles undefined query", () => {
        router.showApp("products", "overview", undefined);

        expect(stateModel.set).toHaveBeenCalledWith({
            menu: "products",
            tab: "overview",
            collapsed: []
        });

        expect(router.appView.render).toHaveBeenCalled();
    });
});
