import { CreationTemplateType } from './type'

/**
 * 週報のSelectコンポーネントを作成する時用
 */
export const weeklyReportSelectProp: CreationTemplateType.FormElementsPropType[] = [
  {
    name: 'template',
    label: 'テンプレート',
    placeholder: '選択してください',
  },
  {
    name: 'requirementId',
    label: '報告週',
    placeholder: '選択してください',
  },
]

/**
 * 週報のTextareaコンポーネントを作成する時用
 */
export const weeklyReportTextareaProps: CreationTemplateType.FormElementsPropType[] = [
  {
    name: 'activityTime',
    label: '活動時間',
    placeholder: '今週の活動とそれにかかった時間を記述してください',
  },
  {
    name: 'doneActivity',
    label: '今週の活動と成果の実績',
    placeholder: '今週のチーム及び個人の活動と、その結果の成果物の状況を記述してください',
  },
  {
    name: 'todoActivity',
    label: '来週の活動と成果の予定',
    placeholder: '次週のチーム及び個人の活動の目標と期待される成果物について、計画を記述してください',
  },
  {
    name: 'solution',
    label: '課題と解決策',
    placeholder: '今週発生した課題と、今週解決した課題及びその解決策を記述してください',
  },
  {
    name: 'event',
    label: 'できごと・気づき',
    placeholder: 'プロジェクト全体で、印象に残る出来事や自分の気づきについて記述してください',
  },
  {
    name: 'remark',
    label: '特記事項',
    placeholder: '他の項目での記述内容以外で報告したい事柄等について記述してください',
  },
]

/**
 * 例文を作成する時用
 */
export const modelSentences: CreationTemplateType.ModelSentencePropsType[] = [
  {
    name: 'activityTime',
    modelSentence: 'チーム作業: 9時間30分\n個人作業: 9時間0分',
  },
  {
    name: 'doneActivity',
    modelSentence:
      'チームの活動と成果の実績\n・モブプログラミングを用いて、チームで一覧ページを実装した。\n・来週のマンスリーレビューの準備のため、マンスリーレビューのアジェンダを相談して決定した。\n・書籍『テスト駆動開発』の輪読会を実施し、テスト駆動開発の方法を学び、チームで実践する方法を話し合った。\n\n個人の活動と成果の実績\n・トップページを実装し、他メンバーにレビューを依頼した。\n・来週の準備として、着手しそうなタスクの細分化を行った。\n・書籍『React実践の教科書』の「再レンダリングの仕組みと最適化」を読み、メモ化の必要性とその方法について学んだ。',
  },
  {
    name: 'todoActivity',
    modelSentence:
      'チームの活動と成果の予定\n・モブプログラミングを用いて、チームでログインページを実装する。\n・マンスリーレビューがあるため、リハーサルを行う。\n・テスト駆動開発の実践について、具体的な計画をたてる。\n\n個人の活動と成果の予定\n・他メンバーからのレビューをもとに、トップページの品質をブラッシュアップする。\n・細分化したタスクに対して見積もりを行い、担当者を割り振る。\n・書籍『React実践の教科書』の「グローバルなState 管理」を読む。',
  },
  {
    name: 'solution',
    modelSentence:
      'チームの課題と解決策\n課題: チームでモブプログラミングを初めて実施したが、モブプログラミングの方法についてメンバー間で認識の齟齬があり、途中で混乱してしまった。\n解決策: 新しい方法を試す際には、実施前に方法や目的の認識合わせを行うこととする。\n\n個人の課題と解決策\n課題: トップページのレビューを依頼した際に、全体的なレイアウトに関する指摘を受け、修正対応が多くなってしまった。\n解決策: コードを書く前に、全体的なレイアウトや実装の方針についてチームに確認することで、修正対応の量を減らす。',
  },
  {
    name: 'event',
    modelSentence:
      'チームのできごと・気づき\n・モブプログラミングを初めて実施したが、ひとつのことに悩む時間が短くなり、実装時間の短縮に繋がることを実感した。また、他メンバーの目線を入れられるので、品質が高くなることを実感した。\n・ミーティングを実施する際に、最初にアイスブレイクを挟むメンバーがいた。これにより、普段あまり発言をしないメンバーも発言数が増えていたため、自分もアイスブレイクを行っていきたい。\n\n個人のできごと・気づき\n・コードレビューを通してセキュリティ観点からのコメントをもらったが、これは自分はまったく思いつかなかった。今後コードを書く際にセキュリティについても気をつけていきたい。\n・タスクを細分化するにあたり、プロダクト全体について考える必要があった。これを通して、普段より広い視点でプロダクトを俯瞰できるようになった。',
  },
  {
    name: 'remark',
    modelSentence: 'チームの特記事項\nなし\n\n個人の特記事項\nなし',
  },
]

const listTemplate = new Array(3).fill('・').join('\n')

/**
 * チームと個人（デフォルト）
 */
export const templateDefaultExists = {
  id: null,
  name: 'チームと個人',
  activityTime: 'チーム作業: ○時間○分\n個人作業: ○時間○分',
  doneActivity: `チームの活動と成果の実績\n${listTemplate}\n\n個人の活動と成果の実績\n${listTemplate}`,
  todoActivity: `チームの活動と成果の予定\n${listTemplate}\n\n個人の活動と成果の予定\n${listTemplate}`,
  solution: 'チームの課題と解決策\n課題: \n解決策: \n\n個人の課題と解決策\n課題: \n解決策: ',
  event: `チームのできごと・気づき\n${listTemplate}\n\n個人のできごと・気づき\n${listTemplate}`,
  remark: 'チームの特記事項\nなし\n\n個人の特記事項\nなし',
  team: null,
}
