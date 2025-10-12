import $ from "jquery";
import Backbone from "backbone";
import Router from "./router/router.js";
import { getDefaultRoute } from "./utils/router.utils.js";

// // In a real-world project, CSS would be split by components
// // (`menu.css`, `tabs.css`) and built with a preprocessor (SASS/PostCSS).
// // For this test, a single `main.css` keeps things simple and focused on JS logic.
import "../assets/styles/main.css";

Backbone.$ = $;

(async function () {
    const defaultPath = await getDefaultRoute();

    const router = new Router({
        defaultPath
    });

    Backbone.history.start({ pushState: true });

    if (!Backbone.history.fragment) {
        router.navigate(defaultPath, { trigger: true, replace: true });
    }
})();
