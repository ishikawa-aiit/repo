import { SettingType } from './type'

/**
 * 設定のSelectコンポーネントを作成する時用
 */
export const settingTeamSelectProp: SettingType.FormElementsPropType[] = [
  {
    name: 'teamId',
    label: '所属PT',
  },
]

/**
 * slack認証で認可を求めるscope
 */
const slackScopes: SettingType.SlackScopeType = ['chat:write']
const slackScopeQuery = `scope=${slackScopes.join(',')}`

/**
 * slack認証に必要なCLIENT_ID
 */
const clientIdQuery = `client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}&`

/**
 * slack認証ページのURL
 */
export const slackAuthorizeUrl = 'https://slack.com/oauth/v2/authorize?' + clientIdQuery + slackScopeQuery
