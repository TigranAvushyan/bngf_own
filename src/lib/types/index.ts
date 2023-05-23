export interface PageType<T> {
  count: number,
  next: string | null,
  previous: string | null,
  results: T[]
}

export const emptyPage = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export interface Table {
  [id: number]: number
}

export type Nullable = null | undefined | 0 | false | ''

export type UnionFrom<T> = T[keyof T]
export type Timer = ReturnType<typeof setTimeout>
export type Time = string | number | Date
