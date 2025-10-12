import _ from "underscore";
import Backbone from "backbone";
import stateModel from "../../models/state.model.js";
import templateHtml from "./tmpl/collapsible.template.html?raw";
import arrowIcon from "../../../assets/icons/arrow.svg?raw";

const template = _.template(templateHtml);

const CollapsibleView = Backbone.View.extend({
    tagName: "div",

    events: {
        "click .header": "toggle"
    },

    initialize(options) {
        this.id = options?.id;
        this.title = options?.title;
        this.content = options?.content;
        this.state = options?.state || stateModel;
        this.listenTo(this.state, "change:collapsed", this.updateState);
    },

    render(isCollapsed) {
        try {
            const collapsed = this.state.get("collapsed") || [];
            isCollapsed = collapsed?.includes(this.id);

            this.$el.html(template({ 
                id: this.id,
                title: this.title,
                content: this.content,
                isCollapsed,
                arrowIcon
            }));

            this.updateState();

            return this;
        } catch (err) {
            console.error(`Error render CollapsibleView ${this.id}:`, err);
            return this;
        }
    },

    toggle() {
        const collapsed = [...(this.state.get("collapsed") || [])];
        const index = collapsed?.indexOf(this.id);

        if (index !== -1) {
            collapsed.splice(index, 1);
            this.expand();
        } else {
            collapsed.push(this.id);
            this.collapse();
        }

        this.state.set({ collapsed });
    },

    collapse() {
        this.$(".content")?.slideUp(200);
    },

    expand() {
        this.$(".content")?.slideDown(200);
    },

    updateState() {
        const collapsed = this.state.get("collapsed") || [];
        const isCollapsed = collapsed?.includes(this.id);

        if (!isCollapsed) {
            this.$(".content")?.hide();
            this.$(".arrow")?.removeClass("expanded")?.addClass("collapsed");
        } else {
            this.$(".content")?.show();
            this.$(".arrow")?.removeClass("collapsed")?.addClass("expanded");
        }
    }
});

export default CollapsibleView;
