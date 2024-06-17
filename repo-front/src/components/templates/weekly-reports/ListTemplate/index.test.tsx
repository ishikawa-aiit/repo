import { screen, within } from '@testing-library/react'
import { useRecoilState } from 'recoil'

import { renderWithQueryClient } from '../../../../../.jest'

import { ListTemplate } from '.'

import { ProductConst } from '@/constants'

const testData = [
  {
    id: 1,
    requirement: {
      id: 14,
      targetDuration: {
        id: 14,
        startAt: '2022-07-04T00:00:00+09:00',
        endAt: '2022-07-09T00:00:00+09:00',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
      },
      submissionDuration: {
        id: 14,
        startAt: '2022-07-10T00:00:00+09:00',
        endAt: '2022-07-17T00:00:00+09:00',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
      },
      createdAt: '2022-05-19T16:23:29.000000Z',
      updatedAt: '2022-05-19T16:23:29.000000Z',
    },
    activityTime: '2時間20分',
    doneActivity: 'やったこと1',
    todoActivity: 'やること1',
    solution: '解決したこと1',
    event: '起こったこと1',
    remark: '特別なこと1',
    createdAt: '2022-05-19T16:23:29.000000Z',
    updatedAt: '2022-05-19T16:23:29.000000Z',
  },
  {
    id: 2,
    requirement: {
      id: 17,
      targetDuration: {
        id: 17,
        startAt: '2022-07-25T00:00:00+09:00',
        endAt: '2022-07-30T00:00:00+09:00',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
      },
      submissionDuration: {
        id: 17,
        startAt: '2022-07-31T00:00:00+09:00',
        endAt: '2022-08-07T00:00:00+09:00',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
      },
      createdAt: '2022-05-19T16:23:29.000000Z',
      updatedAt: '2022-05-19T16:23:29.000000Z',
    },
    activityTime: '8時間50分',
    doneActivity: 'やったこと2',
    todoActivity: 'やること2',
    solution: '解決したこと2',
    event: '起こったこと2',
    remark: '特別なこと2',
    createdAt: '2022-05-19T16:23:29.000000Z',
    updatedAt: '2022-05-19T16:23:29.000000Z',
  },
  {
    id: 3,
    requirement: {
      id: 22,
      targetDuration: {
        id: 22,
        startAt: '2022-10-24T00:00:00+09:00',
        endAt: '2022-10-29T00:00:00+09:00',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
      },
      submissionDuration: {
        id: 22,
        startAt: '2022-10-30T00:00:00+09:00',
        endAt: '2022-11-06T00:00:00+09:00',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
      },
      createdAt: '2022-05-19T16:23:29.000000Z',
      updatedAt: '2022-05-19T16:23:29.000000Z',
    },
    activityTime: '5時間20分',
    doneActivity: 'やったこと3',
    todoActivity: 'やること3',
    solution: '解決したこと3',
    event: '起こったこと3',
    remark: '特別なこと3',
    createdAt: '2022-05-19T16:23:29.000000Z',
    updatedAt: '2022-05-19T16:23:29.000000Z',
  },
]

jest.mock('next/router', () => {
  return {
    __esModule: true,
    useRouter: () => {
      return {
        pathname: '/',
      }
    },
  }
})

jest.mock('recoil')
const setUser = jest.fn()
;(useRecoilState as jest.Mock).mockReturnValue([{ name: '新渡戸 稲造' }, setUser])

describe('props: isError', () => {
  it('trueの場合、ListNoneのエラー体裁がレンダリングされる', () => {
    const { container } = renderWithQueryClient(
      <ListTemplate
        weeklyReportItems={testData}
        isError={true}
        isLoading={false}
        title={`週報一覧 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description="作成した週報を一覧できるページです。"
      />,
    )

    expect(screen.getByTestId('ListNoneIsError')).toBeInTheDocument()
    expect(screen.queryByTestId('Cards')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、Cardsがレンダリングされる', () => {
    const { container } = renderWithQueryClient(
      <ListTemplate
        weeklyReportItems={testData}
        isError={false}
        isLoading={false}
        title={`週報一覧 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description="作成した週報を一覧できるページです。"
      />,
    )

    expect(screen.getByTestId('Cards')).toBeInTheDocument()
    expect(screen.queryByTestId('ListNoneIsError')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('falseの場合、表示項目があれば、ListSidebarがレンダリングされる', () => {
    const { container } = renderWithQueryClient(
      <ListTemplate
        weeklyReportItems={testData}
        isError={false}
        isLoading={false}
        title={`週報一覧 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description="作成した週報を一覧できるページです。"
      />,
    )

    expect(screen.getByTestId('ListSidebar')).toBeInTheDocument()

    const { getByText } = within(screen.getByTestId('ListSidebar'))
    expect(getByText('07/04 ~ 07/09')).toBeInTheDocument()
    expect(getByText('07/25 ~ 07/30')).toBeInTheDocument()
    expect(getByText('10/24 ~ 10/29')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('falseの場合、表示項目がなければ、ListSidebarがレンダリングされない', () => {
    const { container } = renderWithQueryClient(
      <ListTemplate
        weeklyReportItems={[]}
        isError={false}
        isLoading={false}
        title={`週報一覧 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description="作成した週報を一覧できるページです。"
      />,
    )

    expect(screen.queryByTestId('ListSidebar')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
