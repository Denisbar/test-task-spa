// import $ from "jquery";
import Backbone from "backbone";
import CollapsibleView from "../../common/collapsible/collapsible.view.js";

const ContentView = Backbone.View.extend({
    el: "#content",

    initialize() {
        // render bloks
        this.listenTo(this.collection, "reset", this.renderBlocks.bind(this));
        this.listenTo(this.model, "change:collapsed", this.renderBlocks.bind(this));
    },

    async renderBlocks() {
        const collapsed = this.model.get("collapsed") || [];

        const blocks = this.collection ? await Promise.resolve(this.collection.toJSON()) : [];

        this.$el.empty();

        if (!blocks.length) {
            this.$el.html("<div>No blocks for this tab</div>");
            return;
        }

        blocks.forEach(block => {
            const cv = new CollapsibleView({
                id: block.id,
                title: block.title,
                content: block.content,
                state: this.model
            });

            this.$el.append(cv.render(collapsed.includes(block.id)).$el);
        });
    }
});

export default ContentView;
