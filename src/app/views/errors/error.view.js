import Backbone from "backbone";
import _ from "underscore";
import templateHtml from "./tmpl/error.template.html?raw";

const template = _.template(templateHtml);

const ErrorView = Backbone.View.extend({
  tagName: "div",
  className: "error-container",

  initialize(options) {
    this.message = options?.message || "Something went wrong.";
    this.details = options?.details || null;
  },

  render() {
    this.$el.html(template({ message: this.message, details: this.details }));
    return this;
  }
});

export default ErrorView;
