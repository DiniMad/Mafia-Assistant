export type RequireAtLeastOne<T,> =
    Pick<T, Exclude<keyof T, keyof T>>
    & {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]