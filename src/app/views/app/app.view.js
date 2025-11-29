import Backbone from "backbone";
import MenuView from "../menu/menu.view.js";
import TabView from "../tabs/tab.view.js";
import ContentView from "../content/content.view.js";
import stateModel from "../../models/state.model.js";

import BlocksCollection from "../../collections/blocks.collection.js";
import MenusCollection from "../../collections/menus.collection.js";
import TabsCollection from "../../collections/tabs.collection.js";
import ErrorView from "../errors/error.view.js";

const AppView = Backbone.View.extend({
    el: "#app",

    async initialize() {
        this.blocks = new BlocksCollection();
        this.menus = new MenusCollection();
        this.tabsCollection = new TabsCollection();

        console.log('change in master');
        console.log('change in master');
        console.log('change in master');
        console.log('change in master');
        console.log('change in master');

        // some change

        // foos
        this.contentView = new ContentView({
            model: stateModel,
            collection: this.blocks
        });

        this.contentView = new ContentView({
            model: stateModel,
            collection: this.blocks
        });

        this.contentView = new ContentView({
            model: stateModel,
            collection: this.blocks
        });
        this.menuView = new MenuView({
            model: stateModel,
            collection: this.menus,
            contentView: this.contentView
        });
        this.tabView = new TabView({
            model: stateModel,
            collection: this.tabsCollection,
            blocksCollection: this.blocks
        });

        try {
            // Wait for menus to load
            const defaultMenu = stateModel.get("menu") || "products";
            await this.menus.fetchMenus();

            // Set initial tabs
            await this.tabsCollection.setMenu(defaultMenu);
            this.onStateChange();
        } catch (err) {
            const errorView = new ErrorView({ 
                message: "Error loading app. Please try again later.",
                details: err.message 
            });
            this.$el.empty().append(errorView.render().el);
        }

        this.listenTo(stateModel, "change", this.render);
        this.listenTo(stateModel, "change:menu change:tab", this.onStateChange);

        this.listenTo(stateModel, "change:menu change:tab", this.onStateChange);
    },

    async onStateChange() {
        try {
            const menu = stateModel.get("menu");
            let tab = stateModel.get("tab");

            const currentTabsMenu = this.tabsCollection.at(0)?.get("menuKey");
            if (currentTabsMenu !== menu) {
                await this.tabsCollection.setMenu(menu);
            }
            // If tab not selected then take first from coll
            if (menu && !tab) {
                const tabs = await this.tabsCollection.setMenu(menu);
                tab = this.tabsCollection.at(0)?.get("key") || "";
                stateModel.set({ tab });
            }

            if (menu && tab) {
                await this.blocks.setTab(menu, tab);
                this.contentView.renderBlocks();
            }

            this.render();
        } catch (err) {
            console.error("Error in onStateChange:", err);
            const errorView = new ErrorView({ 
                message: "Error loading content. Please try again later.",
                details: err.message 
            });
            this.$el.empty().append(errorView.render().el);
        }
    },

    render() {
        const menu = stateModel.get("menu");
        const tab = stateModel.get("tab");
        const collapsed = stateModel.get("collapsed");

        this.contentView.render(menu, tab, collapsed);
        this.menuView.render(menu);
        this.tabView.render(menu, tab);
    }
});

export default AppView;
