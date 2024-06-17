import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Card } from './Card'
import { CardItem } from './CardItem'
import { CardSkeletons } from './CardSkeletons'

import { Cards } from '.'

export default {
  component: Cards,
  subcomponents: {
    Card,
    CardItem,
    CardSkeletons,
  },
} as ComponentMeta<typeof Cards>

const sampleData = [
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
    createdAt: '2022-05-19T16:23:29.000000Z',
    updatedAt: '2022-05-19T16:23:29.000000Z',
  },
]

export const CardsUsage: ComponentStoryObj<typeof Cards> = {
  storyName: '仕様',
  argTypes: {
    weeklyReportItems: {
      defaultValue: sampleData,
    },
    isLoading: {
      defaultValue: false,
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '週報表示用カードコンポーネントです',
      },
    },
  },
}
