import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

/**
 * APIリクエスト時のミドルウェア
 *
 * @remarks
 * APIサーバにリクエストされる前にアプリケーションサーバにプロキシされます
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  return httpProxyMiddleware(req, res, {
    target: `${process.env.RESOURCE_URL}`,
    changeOrigin: true,
    pathRewrite: [
      {
        patternStr: '^/api',
        replaceStr: '/api',
      },
    ],
  })
}
