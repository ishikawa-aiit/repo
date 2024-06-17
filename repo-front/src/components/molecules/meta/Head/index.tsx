import NextHead from 'next/head'
import { FC, memo } from 'react'

import { HeadType } from './type'

export const Head: FC<HeadType.Props> = memo(({ title, description }) => {
  return (
    <NextHead data-testid="Head" data-cy="Head">
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
})
