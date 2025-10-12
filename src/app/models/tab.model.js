import Backbone from "backbone";

const TabModel = Backbone.Model.extend({
    defaults: {
        key: "",
        label: "",
        menuKey: ""
    }
});

export default TabModel;
