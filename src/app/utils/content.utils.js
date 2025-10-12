// In a real-world scenario, this data would come from an API.
// For the test task, we use static mock data from /mock/content.data.json

let CONTENT_DATA = null;

// Cache store
const cache = {
    menus: null,
    tabs: {},
    blocks: {}
};

async function loadData() {
    if (!CONTENT_DATA) {
        try {
            const response = await fetch("/mock/content.data.json");
            if (!response.ok) {
                throw new Error(`Failed to load content data: ${response.status}`);
            }
            CONTENT_DATA = await response.json();
        } catch (err) {
            console.error("Error loading content data:", err);
            CONTENT_DATA = {}; // fallback
        }
    }
}

// Get list of all menus
export async function getMenus() {
    await loadData();
    if (!cache.menus) {
        cache.menus = Object.keys(CONTENT_DATA);
    }
    return cache.menus;
}


// Get list of tabs for menu
// Return value [{ key, label }]
export async function getTabsByMenu(menuKey) {
    await loadData();
    if (!cache.tabs[menuKey]) {
        const menu = CONTENT_DATA[menuKey];
        cache.tabs[menuKey] = menu?.tabs
            ? Object.entries(menu.tabs).map(([key, value]) => ({
                key,
                label: value.label
            }))
            : [];
    }
    return cache.tabs[menuKey];
}

// Get blocks for tab
export async function getBlocksByTab(menuKey, tabKey) {
    await loadData();
    const cacheKey = `${menuKey}_${tabKey}`;
    if (!cache.blocks[cacheKey]) {
        const tab = CONTENT_DATA[menuKey]?.tabs?.[tabKey];
        cache.blocks[cacheKey] = tab?.blocks || [];
    }
    return cache.blocks[cacheKey];
}

// Drop cache if data CONTENT_DATA updated
export function clearContentCache() {
    CONTENT_DATA = null;
    cache.menus = null;
    cache.tabs = {};
    cache.blocks = {};
}
