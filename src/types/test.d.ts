/// <reference types="vitest" />

import "@testing-library/jest-dom/vitest";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveClass(className: string): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveValue(value: string | number | string[]): R;
  toHaveAttribute(attr: string, value?: string): R;
  toBeVisible(): R;
  toHaveStyle(style: Record<string, unknown>): R;
}
