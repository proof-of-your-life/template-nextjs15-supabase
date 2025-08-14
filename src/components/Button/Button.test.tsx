import { render, screen /*fireEvent*/ } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import Button from "./Button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });

    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const button = screen.getByRole("button", { name: /styled button/i });

    expect(button).toHaveClass("custom-class");
  });

  it("renders different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).toHaveClass("bg-blue-500");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button", { name: /secondary/i })).toHaveClass(
      "bg-gray-500",
    );
  });
});

// // 非同期処理のテスト例
// describe("AsyncComponent", () => {
//   it("loads and displays data", async () => {
//     // APIをモック
//     global.fetch = vi.fn().mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({ message: "Hello World" }),
//     });

//     render(<AsyncComponent />);

//     // ローディング状態を確認
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();

//     // データが表示されるまで待機
//     const message = await screen.findByText("Hello World");
//     expect(message).toBeInTheDocument();

//     // fetchが呼ばれたことを確認
//     expect(global.fetch).toHaveBeenCalledWith("/api/data");
//   });
// });
