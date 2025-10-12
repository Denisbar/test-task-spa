import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getMenus, clearContentCache } from "../../src/app/utils/content.utils.js";

describe("getMenus", () => {
    const mockData = {
        products: { tabs: {} },
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

    it("returns array of menu keys", async () => {
        const menus = await getMenus();
        expect(menus).toEqual(["products", "customers"]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("uses cache on subsequent calls", async () => {
        await getMenus();
        const menus2 = await getMenus();
        expect(menus2).toEqual(["products", "customers"]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("handles fetch failure gracefully", async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        const menus = await getMenus();
        expect(menus).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith(
            "Error loading content data:",
            expect.any(Error)
        );

        consoleSpy.mockRestore();
    });
});
