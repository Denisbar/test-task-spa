import { describe, it, expect, vi, beforeEach } from "vitest";
import Router from "../../src/app/router/router.js";
import stateModel from "../../src/app/models/state.model.js";

describe("Router.initialize", () => {
    let router;

    beforeEach(() => {
        router = new Router();

        router.navigate = vi.fn();

        vi.spyOn(stateModel, "get").mockImplementation((key) => {
            if (key === "menu") return "products";
            if (key === "tab") return "overview";
            if (key === "collapsed") return ["block1", "block2"];
            return null;
        });

        router.appView.render = vi.fn();
    });

    it("subscribes to stateModel change and navigates correctly", () => {
        router.initialize();

        stateModel.trigger("change");

        expect(router.navigate).toHaveBeenCalledWith(
            "/products/overview?collapse=block1,block2",
            { trigger: false }
        );
    });
});
