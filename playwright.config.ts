import { defineConfig, devices } from "@playwright/test";
type BrowserName = "chromium" | "webkit" | "firefox";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const browserName = (process.env.PLAYWRIGHT_ENGINE ||
	"chromium") as BrowserName;

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: "list",
	use: {
		baseURL,
		trace: "retain-on-failure",
		browserName,
		channel:
			browserName === "chromium" ? process.env.PLAYWRIGHT_CHANNEL : undefined,
		launchOptions:
			browserName === "chromium"
				? { args: ["--enable-unsafe-swiftshader"] }
				: undefined,
	},
	projects: [
		{
			name: "mobile",
			use: {
				...devices["iPhone 13"],
				defaultBrowserType: browserName,
				isMobile: browserName !== "firefox",
				deviceScaleFactor: 1,
			},
		},
		{ name: "tablet", use: { viewport: { width: 834, height: 1112 } } },
		{ name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
	],
	webServer: process.env.PLAYWRIGHT_DISABLE_WEBSERVER
		? undefined
		: {
				command: "npm run start -- --hostname 127.0.0.1",
				url: baseURL,
				reuseExistingServer: !process.env.CI,
				timeout: 30_000,
			},
});
