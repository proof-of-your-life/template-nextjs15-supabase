import { test as base, expect, type Page } from "@playwright/test";

// カスタムフィクスチャの定義
export const test = base.extend<{
  authenticatedPage: Page;
}>({
  // 認証済みページのフィクスチャ
  authenticatedPage: async ({ page }, usePageFixture) => {
    // ログイン処理
    await page.goto("/login");
    await page.fill('[name="email"]', "test@example.com");
    await page.fill('[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // ログイン完了を待機
    await page.waitForURL("/dashboard");

    // 認証済みページを使用
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await usePageFixture(page);
  },
});

export { expect };

// 共通のセレクタ
export const selectors = {
  // ナビゲーション
  nav: {
    home: '[data-testid="nav-home"]',
    about: '[data-testid="nav-about"]',
    contact: '[data-testid="nav-contact"]',
    profile: '[data-testid="nav-profile"]',
  },
  // フォーム要素
  form: {
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: '[data-testid="error-message"]',
    successMessage: '[data-testid="success-message"]',
  },
  // 共通コンポーネント
  components: {
    modal: '[data-testid="modal"]',
    modalClose: '[data-testid="modal-close"]',
    dropdown: '[data-testid="dropdown"]',
    spinner: '[data-testid="loading-spinner"]',
  },
};

// ユーティリティ関数
export const utils = {
  // ローディングが完了するまで待機
  async waitForLoadingToComplete(page: Page) {
    await page.waitForSelector(selectors.components.spinner, {
      state: "hidden",
    });
  },

  // ネットワークリクエストを待機
  async waitForApiResponse(page: Page, url: string) {
    return page.waitForResponse(
      (response) => response.url().includes(url) && response.status() === 200,
    );
  },

  // 特定のテキストが表示されるまで待機
  async waitForText(page: Page, text: string) {
    await page.waitForSelector(`text="${text}"`, {
      state: "visible",
    });
  },

  // スクリーンショットを撮影（デバッグ用）
  async takeDebugScreenshot(page: Page, name: string) {
    if (process.env.DEBUG) {
      await page.screenshot({
        path: `e2e/screenshots/debug-${name}-${Date.now()}.png`,
        fullPage: true,
      });
    }
  },

  // フォームの入力をクリア
  async clearInput(page: Page, selector: string) {
    await page.click(selector, { clickCount: 3 });
    await page.keyboard.press("Backspace");
  },

  // 日付入力のヘルパー
  async fillDateInput(page: Page, selector: string, date: Date) {
    const dateString = date.toISOString().split("T")[0];
    await page.fill(selector, dateString);
  },

  // ファイルアップロードのヘルパー
  async uploadFile(page: Page, selector: string, filePath: string) {
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.click(selector);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  },
};

// APIモックのヘルパー
export const mockApi = {
  // APIレスポンスをモック
  async mockResponse(page: Page, url: string, response: any) {
    await page.route(url, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(response),
      }),
    );
  },

  // APIエラーをモック
  async mockError(page: Page, url: string, status = 500) {
    await page.route(url, (route) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      }),
    );
  },

  // ネットワークの遅延をシミュレート
  async mockSlowNetwork(page: Page, delay = 3000) {
    await page.route("**/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await route.continue();
    });
  },
};

// アクセシビリティチェック
export const a11y = {
  async checkPageAccessibility(page: Page) {
    // タブナビゲーションのチェック
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(focusedElement).toBeTruthy();

    // ARIAラベルの存在チェック
    const buttons = await page.$$("button");
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute("aria-label");
      const textContent = await button.textContent();
      expect(ariaLabel || textContent).toBeTruthy();
    }
  },

  // コントラスト比のチェック（簡易版）
  async checkContrast(page: Page) {
    const result = await page.evaluate(() => {
      const elements = document.querySelectorAll("*");
      const issues: string[] = [];

      elements.forEach((el) => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const color = styles.color;

        // 簡易的なチェック（実際のコントラスト計算は複雑）
        if (bgColor === color && bgColor !== "rgba(0, 0, 0, 0)") {
          issues.push(`Same color and background: ${el.tagName}`);
        }
      });

      return issues;
    });

    expect(result).toHaveLength(0);
  },
};
