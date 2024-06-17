import { ApiCustomTemplateTypes, ApiTeamsTypes } from '@/types'

/**
 * カスタムテンプレート
 */
export namespace CustomTemplateTypes {
  export type CustomTemplateProps = Pick<
    ApiCustomTemplateTypes.CustomTemplate,
    'id' | 'name' | 'activityTime' | 'doneActivity' | 'todoActivity' | 'solution' | 'event' | 'remark' | 'team'
  > & {
    [key: string]: string | number | ApiTeamsTypes.Team | null
  }

  export type CustomTemplatesProps = CustomTemplateProps[]
}
