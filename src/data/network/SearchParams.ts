export type SearchParamsKeyValue = { [key: string]: string | number | boolean };

export type SearchParams =
  | string
  | SearchParamsKeyValue
  | Array<Array<string | number | boolean>>
  | URLSearchParams;
