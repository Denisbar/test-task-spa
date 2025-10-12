import { describe, it, expect, vi, beforeEach } from "vitest";
import Backbone from "backbone";
import $ from "jquery";

const renderMock = vi.fn().mockReturnValue({ $el: $("<div></div>") });

vi.mock("../../src/app/common/collapsible/collapsible.view.js", () => {
    return {
        default: vi.fn().mockImplementation(() => {
            return { render: renderMock };
        })
    };
});

import ContentView from "../../src/app/views/content/content.view.js";
import CollapsibleView from "../../src/app/common/collapsible/collapsible.view.js";

describe("ContentView", () => {
    let collection;
    let model;
    let contentView;

    beforeEach(() => {
        document.body.innerHTML = "<div id=\"content\"></div>";

        collection = new Backbone.Collection();
        model = new Backbone.Model({ collapsed: [] });

        contentView = new ContentView({ collection, model });

        CollapsibleView.mockClear();
        renderMock.mockClear();
    });

    it("renders message when collection is empty", async () => {
        await contentView.renderBlocks();
        expect($("#content").html()).toContain("No blocks for this tab");
    });

    it("creates CollapsibleView for each block", async () => {
        collection.reset([
            { id: "b1", title: "Block 1", content: "Content 1" },
            { id: "b2", title: "Block 2", content: "Content 2" }
        ]);

        await contentView.renderBlocks();

        expect(CollapsibleView).toHaveBeenCalledTimes(4);

        expect(CollapsibleView).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "b1",
                title: "Block 1",
                content: "Content 1",
                state: model
            })
        );

        expect(CollapsibleView).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "b2",
                title: "Block 2",
                content: "Content 2",
                state: model
            })
        );
    });
});
