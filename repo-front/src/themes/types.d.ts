export namespace ThemesTypes {
  export type RecursiveProperty<T = string | number> = RecursiveObject<T> | T

  export interface RecursiveObject<T = string | number> {
    [property: string]: RecursiveProperty<T>
  }
}
