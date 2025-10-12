import Backbone from "backbone";
import MenuModel from "../models/menu.model.js";
import { getMenus } from "../utils/content.utils.js";

const MenusCollection = Backbone.Collection.extend({
    model: MenuModel,

    initialize() {
        this.fetchMenus();
    },

    async fetchMenus() {
        const keys = await getMenus();
        const menus = keys.map(key => ({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1)
        }));
        this.reset(menus);
    }
});

export default MenusCollection;
