import { describe, it, expect } from "vitest";
import { render } from "../test-utils";
import NotFoundPage from "@/pages/NotFoundPage";

describe("NotFoundPage", () => {
  it("matches the snapshot", () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });
});
