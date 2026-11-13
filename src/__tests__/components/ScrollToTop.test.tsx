/**
 * Component Tests for ScrollToTop
 *
 * Component tests verify that React components:
 * - Render correctly
 * - Handle user interactions
 * - Update state properly
 * - Have correct accessibility attributes
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ScrollToTop from "@/components/ui/ScrollToTop";

describe("ScrollToTop", () => {
  // Mock window.scrollTo
  const scrollToMock = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.stubGlobal("scrollTo", scrollToMock);
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    scrollToMock.mockClear();
  });

  it("should render the button", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });

  it("should have correct accessibility label", () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText("Scroll to top");
    expect(button).toBeInTheDocument();
  });

  it("should be hidden initially (scrollY = 0)", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });
    // Check for opacity-0 class which hides the button
    expect(button.className).toContain("opacity-0");
  });

  it("should become visible when scrollY > 400", () => {
    render(<ScrollToTop />);

    // Simulate scroll past 400px
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /scroll to top/i });
    expect(button.className).toContain("opacity-100");
  });

  it("should call scrollTo when clicked", () => {
    render(<ScrollToTop />);

    // Make button visible first
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /scroll to top/i });
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should hide when scrolling back to top", () => {
    render(<ScrollToTop />);

    // First, scroll down
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);

    // Then scroll back up
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /scroll to top/i });
    expect(button.className).toContain("opacity-0");
  });

  it("should have pointer-events-none when hidden", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });
    expect(button.className).toContain("pointer-events-none");
  });

  it("should have correct styling classes", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });

    // Check for important styling classes
    expect(button.className).toContain("fixed");
    expect(button.className).toContain("bottom-6");
    expect(button.className).toContain("left-6");
    expect(button.className).toContain("rounded-full");
    expect(button.className).toContain("bg-primary-600");
  });
});
