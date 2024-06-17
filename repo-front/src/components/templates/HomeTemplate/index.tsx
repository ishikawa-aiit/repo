import { FC, memo } from 'react'

import { HomeFeature, HomeTitle, HomeLayout } from '../../organisms'

import { HomeTemplateType } from './types'

import { Head } from '@/components/molecules'

export const HomeTemplate: FC<HomeTemplateType.Props> = memo(({ title, description }) => {
  return (
    <HomeLayout data-testid="HomeTemplate" data-cy="HomeTemplate">
      <Head title={title} description={description} />
      <HomeTitle />
      <HomeFeature />
    </HomeLayout>
  )
})
