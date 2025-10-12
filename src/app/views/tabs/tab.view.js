import _ from "underscore";
import Backbone from "backbone";
import stateModel from "../../models/state.model.js";
import templateHtml from "./tmpl/tab.template.html?raw";

const template = _.template(templateHtml);

const TabView = Backbone.View.extend({
    el: "#tabs",

    events: {
        "click .tab-item": "onTabClick"
    },

    initialize(options) {
        this.collection = options.collection; // TabsCollection
        this.listenTo(this.collection, "reset", this.onCollectionReset.bind(this));
    },

    async onCollectionReset() {
        const menu = stateModel.get("menu");
        const activeTab = stateModel.get("tab");
        this.render(menu, activeTab);
    },

    async render(menu, activeTab) {
        if (!menu) return;

        let tabs = [];
        if (this.collection) {
            tabs = this.collection.toJSON();
        }

        this.$el.html(template({ tabs, activeTab }));
    },

    onTabClick(e) {
        const selectedTab = e.currentTarget.dataset.tab;
        stateModel.set({ tab: selectedTab, collapsed: [] });
    }
});

export default TabView;
