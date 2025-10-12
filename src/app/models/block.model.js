import Backbone from "backbone";

const BlockModel = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
        id: "",
        title: "",
        content: "",
        menuKey: "",
        tabKey: ""
    }
});

export default BlockModel;
