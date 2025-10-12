import Backbone from "backbone";

export default Backbone.View.extend({
    close() {
        this.remove();
        this.stopListening();
        if (this.onClose) {
            this.onClose();
        }
    }
});
