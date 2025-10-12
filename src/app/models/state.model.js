import Backbone from "backbone";

const StateModel = Backbone.Model.extend({
    defaults: {
        menu: "customers",
        tab: "general",
        collapsed: ["shipping"]
    }
});

export default new StateModel();
