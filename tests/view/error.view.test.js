import { describe, it, expect, beforeEach } from "vitest";
import Backbone from "backbone";
import ErrorView from "../../src/app/views/errors/error.view.js";

describe("ErrorView", () => {
  let errorView;

  beforeEach(() => {
    errorView = new ErrorView({ message: "Test error message", details: "Additional details" });
  });

  it("should create an instance with default properties", () => {
    const defaultView = new ErrorView({});
    expect(defaultView.message).toBe("Something went wrong.");
    expect(defaultView.details).toBeNull();
  });

  it("should render the message correctly", () => {
    errorView.render();
    expect(errorView.el.textContent).toContain("Test error message");
  });

  it("should render the details if provided", () => {
    errorView.render();
    expect(errorView.el.textContent).toContain("Additional details");
  });

  it("should return itself from render for chaining", () => {
    const result = errorView.render();
    expect(result).toBe(errorView);
  });

  it("should have the correct class name", () => {
    expect(errorView.el.classList.contains("error-container")).toBe(true);
  });
});
