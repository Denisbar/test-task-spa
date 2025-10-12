import Backbone from "backbone";
import TabModel from "../models/tab.model.js";
import { getTabsByMenu } from "../utils/content.utils.js";

const TabsCollection = Backbone.Collection.extend({
    model: TabModel,
  
    // Set tabs for a specific menu
    async setMenu(menuKey) {
        const tabsData = await getTabsByMenu(menuKey);

        const tabs = tabsData.map(tab => ({
            key: tab.key,
            label: tab.label,
            menuKey
        }));

        this.reset(tabs);
        return this.models;
    }
});

export default TabsCollection;
