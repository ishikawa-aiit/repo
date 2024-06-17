module.exports = {
  /**
   * Headless Chromeオプション
   */
  CHROME_OPTIONS: {
    logLevel: 'info',
    chromeFlags: ['--headless', '--no-sandbox'],
  },
  /**
   * Lighthouse実行時に対象とするメトリクス
   */
  TARGET_METRICS: [
    'largest-contentful-paint',
    'max-potential-fid',
    'cumulative-layout-shift',
    'first-contentful-paint',
    'interactive',
    'speed-index',
    'first-meaningful-paint',
    'total-blocking-time',
  ],
  /**
   * Lighthouseオプション
   */
  LIGHTHOUSE_OPTIONS: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10 * 1024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
      onlyAudits: [
        'largest-contentful-paint',
        'max-potential-fid',
        'cumulative-layout-shift',
        'first-contentful-paint',
        'interactive',
        'speed-index',
        'first-meaningful-paint',
        'total-blocking-time',
      ],
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      headless: true,
    },
  },
}
