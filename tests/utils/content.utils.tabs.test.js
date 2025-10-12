import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getTabsByMenu, clearContentCache } from "../../src/app/utils/content.utils.js";

describe("getTabsByMenu", () => {
    const mockData = {
        products: { 
            tabs: {
                overview: { label: "Overview" },
                details: { label: "Details" }
            } 
        },
        customers: { tabs: {} }
    };

    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );
        clearContentCache();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns array of tabs for a menu", async () => {
        const tabs = await getTabsByMenu("products");
        expect(tabs).toEqual([
            { key: "overview", label: "Overview" },
            { key: "details", label: "Details" }
        ]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("returns empty array if menu has no tabs", async () => {
        const tabs = await getTabsByMenu("customers");
        expect(tabs).toEqual([]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("uses cache on subsequent calls", async () => {
        await getTabsByMenu("products");
        const tabs2 = await getTabsByMenu("products");
        expect(tabs2).toEqual([
            { key: "overview", label: "Overview" },
            { key: "details", label: "Details" }
        ]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
