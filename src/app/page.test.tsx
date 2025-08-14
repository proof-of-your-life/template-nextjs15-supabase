import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("Home Page", () => {
  it('renders a button labeled "Test Button"', () => {
    render(<Page />);
    expect(
      screen.getByRole("button", { name: /Test Button/i }),
    ).toBeInTheDocument();
  });
});
