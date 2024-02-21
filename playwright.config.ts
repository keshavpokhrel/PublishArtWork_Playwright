import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 90000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://alt-art-frontend-staging.vercel.app",
    //to run in headless mode please make below true
    headless: false,
    screenshot : "only-on-failure",
    video:"retain-on-failure"
  },
  fullyParallel:false,
  //To run all browser in parallel run, please comment below worker.
  //workers: 1,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized']
        },
      },
    }
    ,
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // launchOptions: {
        //   args: ["--kiosk"]
        // }
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Test against mobile viewports. */
    {
      name: 'mobile chrome',
      use: { ...devices['Pixel 7'] },
    },

  ],
});
