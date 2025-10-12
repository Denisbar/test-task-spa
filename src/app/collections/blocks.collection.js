import Backbone from "backbone";
import BlockModel from "../models/block.model.js";
import { getBlocksByTab } from "../utils/content.utils.js";

const BlocksCollection = Backbone.Collection.extend({
    model: BlockModel,

    // Set blocks for a specific menu and tab
    async setTab(menuKey, tabKey) {
        const blocksData = await getBlocksByTab(menuKey, tabKey);
        const blocks = blocksData.map(b => ({ ...b, menuKey, tabKey }));
        this.reset(blocks);
    }
});

export default BlocksCollection;
