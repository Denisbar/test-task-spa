import { describe, it, expect, vi } from "vitest";
import { getDefaultRoute } from "../../src/app/utils/router.utils.js";
import * as contentUtils from "../../src/app/utils/content.utils.js";

describe("getDefaultRoute", () => {
    it("returns a default route string", async () => {
        vi.spyOn(contentUtils, "getMenus").mockResolvedValue(["products", "customers"]);
        vi.spyOn(contentUtils, "getTabsByMenu").mockResolvedValue([{ key: "addresses", label: "Addresses" }]);

        const route = await getDefaultRoute();
        expect(route).toBe("customers/addresses");
    });

    it("falls back to hardcoded route if error occurs", async () => {
        vi.spyOn(contentUtils, "getMenus").mockRejectedValue(new Error("fail"));

        const route = await getDefaultRoute();
        expect(route).toBe("customers/addresses");
    });
});