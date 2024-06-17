require('dotenv').config()

/** パフォーマンス計測対象のURL */
const BASE_URL = process.env.PERFORMANCE_TARGET_URL
/** トークン取得時に使用するAPIのURL */
const API_URL = process.env.PERFORMANCE_API_URL
/** DatadogのAPIキー */
const DATADOG_API_KEY = process.env.DATADOG_API_KEY

const ChromeLauncher = require('chrome-launcher')
const Lighthouse = require('lighthouse')
const ReportGenerator = require('lighthouse/report/generator/report-generator')
const Puppeteer = require('puppeteer')
const Axios = require('axios')
const Constants = require('./constants')
const Urls = require('./urls')

const CHROME_OPTIONS = Constants.CHROME_OPTIONS
const LIGHTHOUSE_OPTIONS = Constants.LIGHTHOUSE_OPTIONS
const TARGET_METRICS = Constants.TARGET_METRICS

/** 計測対象のページ */
const TARGET_URLS = Urls.TARGETS.map((url) => {
  return `${BASE_URL}${url}`
})

/**
 * テストユーザー用のAPIトークンを取得する
 *
 * @returns {string} テストユーザー用のAPIトークン
 */
const getAPIToken = async () => {
  const response = await Axios.post(`${API_URL}/api/auth/login/test`, {
    email: 'test@example.com',
  })

  return JSON.stringify(response.data.token)
}

/**
 * Datadogに送信するメトリクスデータ名を取得する
 *
 * @param {string} url 計測対象のURL
 * @param {AuditsResult} data 取得したメトリクスデータ
 * @returns {string} メトリクスデータ名
 */
const metricsName = (url, data) => {
  let pathName = url.replace(BASE_URL, '').replace('-', '_').replace('/', '_')
  const dataName = data.id.replace('-', '_')

  if(pathName === '_') {
    pathName = 'index'
  }

  return `webperf.${pathName}.${dataName}`
}

const main = async () => {
  if (!DATADOG_API_KEY) {
    throw 'DatadogのAPIキーが必要です'
  }

  // Chrome LauncherでChromeを起動しPuppeteerに接続
  const chrome = await ChromeLauncher.launch(CHROME_OPTIONS)
  const { webSocketDebuggerUrl } = await Axios.get(`http://localhost:${chrome.port}/json/version`)
  .then(response => {
    return response.data
  })

  const browser = await Puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  })
  const ddClient = new DatadogClient(DATADOG_API_KEY)

  // テストユーザーでのログイン実行
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()
  const token = await getAPIToken()

  await page.goto(`${BASE_URL}/`)
  await navigationPromise
  await page.evaluate(({ token }) => {
    localStorage.setItem('apiToken.atom', token);
  }, { token })

  // 測定実行
  for (const url of TARGET_URLS) {
    const { lhr } = await Lighthouse(url, { ...CHROME_OPTIONS, port: chrome.port }, LIGHTHOUSE_OPTIONS)
    const json = ReportGenerator.generateReport(lhr, 'json')
    const audits = JSON.parse(json).audits

    // Datadogへの送信
    await Promise.all(
      TARGET_METRICS.map(async (metrics) => {
        await ddClient.sendMetrics(metricsName(url, audits[metrics]), audits[metrics])
      }),
    )
  }

  await browser.disconnect()
  await chrome.kill()
}

/**
 * Datadogにメトリクスデータを送信するクライアント
 */
class DatadogClient {
  apiUrl

  constructor(apiKey) {
    this.apiUrl = `https://api.datadoghq.com/api/v1/series?api_key=${apiKey}`
  }

  async sendMetrics(metricsName, data) {
    const requestBody = {
      series: [
        {
          metric: metricsName,
          points: [[`${Math.floor(Date.now() / 1000)}`, `${Math.round(data.numericValue / 10) * 10}`]],
          type: 'gauge',
        },
      ],
    }

    return await this.post(requestBody)
  }

  async post(requestBody) {
    return await Axios.post(this.apiUrl, requestBody)
  }
}

try {
  main()
} catch (e) {
  console.error(e)
}
