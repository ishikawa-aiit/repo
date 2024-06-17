export namespace ApiAuthTypes {
  export type RedirectRequest = null

  export type RedirectResponse = {
    /** 転送先 */
    url: string
  }

  export type LoginRequest = {
    /** googleAuthから受け取った情報 */
    code: string
  }

  export type LoginSuccessfulResponse = {
    /** APIトークン */
    token: string
  }
}
