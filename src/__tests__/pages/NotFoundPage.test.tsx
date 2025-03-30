import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../test-utils";
import NotFoundPage from "@/pages/NotFoundPage";

describe("NotFoundPage", () => {
  it("matches the snapshot", () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });

  it("navigates to home page when button is clicked", async () => {
    const user = userEvent.setup();

    render(<NotFoundPage />, { route: "/random-page" });
    const link = screen.getByRole("link", { name: /go home/i });

    await user.click(link);
    expect(window.location.pathname).toBe("/");
  })
});
