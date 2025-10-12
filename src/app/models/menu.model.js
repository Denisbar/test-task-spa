import Backbone from "backbone";

const MenuModel = Backbone.Model.extend({
    defaults: {
        key: "",
        label: ""
    }
});

export default MenuModel;
