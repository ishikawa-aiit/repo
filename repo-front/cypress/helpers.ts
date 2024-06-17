/**
 * 現在の日時を文字列で取得する
 */
export const getTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const min = now.getMinutes()
  const sec = now.getSeconds()
  return `${year}年${month}月${day}日${hour}:${min}:${sec}`
}

/**
 * 週報作成時の入力項目を生成する
 *
 * @param overwrittenRemark
 */
export const createWeeklyReportInputs = (overwrittenRemark = 'なし') => {
  const time = getTime()

  return [
    { type: 'textarea', name: 'activityTime', value: '協働作業: 9時間 各自作業: 10時間' },
    { type: 'textarea', name: 'doneActivity', value: 'いろいろやります' },
    { type: 'textarea', name: 'todoActivity', value: 'いろいろやりました' },
    { type: 'textarea', name: 'solution', value: 'いろいろな問題がおきました' },
    { type: 'textarea', name: 'event', value: 'いろいろなことがありました' },
    { type: 'textarea', name: 'remark', value: overwrittenRemark },
  ].map((item) => {
    item.value = `${time} ${item.value}`
    return item
  })
}

/**
 * カスタムテンプレート作成時の入力項目を生成する
 *
 * @param overwrittenTemplateName
 */
export const createCustomTemplateInputs = (overwrittenTemplateName = 'カスタムテンプレート') => {
  return [
    { type: 'input', name: 'name', value: overwrittenTemplateName },
    { type: 'textarea', name: 'activityTime', value: '協働作業: ◯時間 各自作業: ◯時間' },
    { type: 'textarea', name: 'doneActivity', value: '（テンプレート）いろいろやります' },
    { type: 'textarea', name: 'todoActivity', value: '（テンプレート）いろいろやりました' },
    { type: 'textarea', name: 'solution', value: '（テンプレート）いろいろな問題がおきました' },
    { type: 'textarea', name: 'event', value: '（テンプレート）いろいろなことがありました' },
    { type: 'textarea', name: 'remark', value: '（テンプレート）なし' },
  ]
}
