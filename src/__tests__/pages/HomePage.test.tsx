import HomePage from "@/pages/HomePage";
import { render } from "@/__tests__/test-utils"; 
import { describe, it, expect } from "vitest";

describe("HomePage", () => {
  it("renders correctly", () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
