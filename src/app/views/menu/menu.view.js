import _ from "underscore";
import Backbone from "backbone";
import templateHtml from "./tmpl/menu.template.html?raw";
import ErrorView from "../errors/error.view.js";

const template = _.template(templateHtml);

const MenuView = Backbone.View.extend({
    el: "#menu",

    events: {
        "click .menu-item": "onMenuClick"
    },

    initialize(options) {
        this.collection = options.collection;
        this.model = options.model;
        this.contentView = options.contentView; // ContentView to clear blocks
        this.tabsCollection = options.tabsCollection;

        this.listenTo(this.collection, "reset", this.render);
    },

    async render() {
        try {
            const activeMenu = this.model.get("menu");
            const menus = this.collection ? await Promise.resolve(this.collection.toJSON()) : [];
            this.$el.html(template({ menus, activeMenu }));
        } catch (err) {
            const errorView = new ErrorView({ 
                message: "Error loading menu. Please try again later.",
                details: err.message 
            });
            this.$el.empty().append(errorView.render().el);
            console.error("Error rendering MenuView:", err);
        }
        
        return this;
    },

    async onMenuClick(e) {
        const selectedMenu = e.currentTarget.dataset.key.trim();
        this.model.set({ menu: selectedMenu, tab: "", collapsed: [] });

        if (this.contentView) {
            this.contentView.$el.empty(); // Clear ContentView bc no tab selected
        }

        if (this.tabsCollection && this.tabsCollection.setMenu) {
            await this.tabsCollection.setMenu(selectedMenu);
        }
    }
});

export default MenuView;
