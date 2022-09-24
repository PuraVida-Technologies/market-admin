/* @jest-environment jsdom */

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import EmptyPage from "@/pages/index";

describe("EmptyPage", () => {
  it("should be blank", () => {
    const { container } = render(<EmptyPage />);
    expect(container.innerHTML).toEqual("");
  });
});
