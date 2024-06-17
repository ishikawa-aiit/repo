import { ApiCustomTemplateTypes } from '.'

export namespace ApiGetCustomTemplateTypes {
  export type Response = ApiCustomTemplateTypes.CustomTemplates

  export type QueryType = 'self-created' | 'all'
}
