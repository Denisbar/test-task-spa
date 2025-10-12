import { getMenus, getTabsByMenu } from "./content.utils.js";

// default route from json
export async function getDefaultRoute() {
    try {
        const menus = await getMenus();
    
        if (!menus.length) {
            return "customers/addresses"; // just in case
        }

        const defaultMenu = menus[1];
        const tabs = await getTabsByMenu(defaultMenu);
    
        if (!tabs.length) {
            return `${defaultMenu}/addresses`; // if no tabs
        }

        const defaultTab = tabs[0].key;
    
        return `${defaultMenu}/${defaultTab}`;
    } catch (err) {
        console.error("Failed to get default route:", err);
    
        return "customers/addresses"; // fallback
    }
}
