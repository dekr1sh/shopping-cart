import Footer from "@/components/Footer";
import { render } from "@/__tests__/test-utils"; 
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("renders correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
