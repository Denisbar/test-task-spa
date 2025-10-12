import Backbone from "backbone";
import AppView from "../views/app/app.view.js";
import stateModel from "../models/state.model.js";
import { getDefaultRoute } from "../utils/router.utils.js";

const parseCollapseParam = (query) => {
    const params = new URLSearchParams(query);
    const collapse = params.get("collapse");
    return collapse ? collapse.split(",") : [];
};

const Router = Backbone.Router.extend({
    routes: {
        ":menu/:tab": "showApp",
        "*path": "defaultRoute"
    },

    initialize() {
        this.appView = new AppView();

        // Listen to renew url
        this.listenTo(stateModel, "change", () => {
            const menu = stateModel.get("menu");
            const tab = stateModel.get("tab");
            const collapsed = stateModel.get("collapsed") || [];
            const query = collapsed.length ? `?collapse=${collapsed.join(",")}` : "";
            const url = `/${menu}/${tab}${query}`;

            this.navigate(url, { trigger: false }); // to history
        });
    },

    showApp(menu, tab, query) {
        try {
            let collapseIds = [];
            try {
                collapseIds = parseCollapseParam(query || "");
                if (!Array.isArray(collapseIds)) {
                    collapseIds = [];
                }
            } catch (err) {
                console.error("Error parce collapse:", err);
                collapseIds = [];
            }

            // Set state
            stateModel.set({
                menu,
                tab,
                collapsed: collapseIds
            });

            this.appView.render();
        } catch (err) {
            console.error("Error in showApp:", err);

            // Default redirect
            const defaultPath = getDefaultRoute();
            try {
                this.navigate(defaultPath, { trigger: true, replace: true });
            } catch (navErr) {
                console.error("Error to redirect to default:", navErr);
            }
        }
    },


    defaultRoute(path) {
        console.warn(`Route "${path}" not found.`);
    
        // default path and navigate
        getDefaultRoute().then(defaultPath => {
            this.navigate(defaultPath, { trigger: true, replace: true });
        }).catch(err => {
            console.error("Failed to get default route:", err);
        });

    // this.appView.render404();
    }
});

export default Router;
