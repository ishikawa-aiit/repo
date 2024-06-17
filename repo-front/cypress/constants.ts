export const selectors = {
  /**
   * テンプレート作成ページのセレクタ
   */
  createTemplate: {
    shareSwitch: '[data-cy=Switch_isShared]',
    templateSelect: '[data-cy=Select_id]',
  },
  /**
   * 週報作成ページのセレクタ
   */
  createWeeklyReport: {
    activityTimeField: 'textarea[name="activityTime"]',
    applyTemplateButton: '[data-cy=ApplyTemplateButton]',
    templateModal: '[data-cy=TemplateModal]',
    templateSelect: '[data-cy=Select_template]',
    shareSwitch: '[data-cy=Switch_isShared]',
  },
  /**
   * 週報一覧ページのセレクタ
   */
  indexWeeklyReport: {
    card: '[data-cy=Card]',
    copyButton: '[data-cy=ClipboardCopyButton]',
    listSidebar: '[data-cy=ListSidebar]',
  },
  /**
   * 所属PT設定ページのセレクタ
   */
  setting: {
    teamSelect: '[data-cy=Select_teamId]',
    slackSettingButton: '[data-cy=ButtonSlackConnection]',
    slackSettingStatus: '[data-cy=SlackSettingStatus]',
  },
  /**
   * トップページのセレクタ
   */
  top: {
    linkToCreationPage: '[data-cy="LinkToCreationPage"]',
  },
  /**
   * トーストのセレクタ
   */
  toast: '[role=alert]',
}

/**
 * 報告週セレクトボックスのオプション
 */
export const reportWeekSelectOptions = {
  select1: { id: '1', display: '04/04 ~ 04/09' },
  select2: { id: '2', display: '04/11 ~ 04/16' },
}
