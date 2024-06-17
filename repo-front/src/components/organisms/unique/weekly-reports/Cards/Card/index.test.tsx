import { render, screen, within } from '@testing-library/react'

import { Card } from '.'

const testData = {
  reportWeek: '07/04 ~ 07/09',
  activityTime: 'テスト活動時間',
  doneActivity: 'やったこと',
  todoActivity: 'やること',
  solution: '解決したこと',
  event: '起こったこと',
  remark: '特別なこと',
}

describe('Card', () => {
  it('正常にレンダリングされている', () => {
    const { container } = render(<Card weeklyReportItem={testData} id={1} />)
    const { getAllByRole } = within(screen.getByTestId('Card'))

    expect(getAllByRole('term')[0]).toHaveTextContent('報告週')
    expect(getAllByRole('term')[1]).toHaveTextContent('活動時間')
    expect(getAllByRole('term')[2]).toHaveTextContent('今週の活動と成果の実績')
    expect(getAllByRole('term')[3]).toHaveTextContent('来週の活動と成果の予定')
    expect(getAllByRole('term')[4]).toHaveTextContent('課題と解決策')
    expect(getAllByRole('term')[5]).toHaveTextContent('できごと・気づき')
    expect(getAllByRole('term')[6]).toHaveTextContent('特記事項')
    expect(getAllByRole('definition')[0]).toHaveTextContent(testData.reportWeek)
    expect(getAllByRole('definition')[1]).toHaveTextContent(testData.activityTime)
    expect(getAllByRole('definition')[2]).toHaveTextContent(testData.doneActivity)
    expect(getAllByRole('definition')[3]).toHaveTextContent(testData.todoActivity)
    expect(getAllByRole('definition')[4]).toHaveTextContent(testData.solution)
    expect(getAllByRole('definition')[5]).toHaveTextContent(testData.event)
    expect(getAllByRole('definition')[6]).toHaveTextContent(testData.remark)
    expect(container).toMatchSnapshot()
  })
})
