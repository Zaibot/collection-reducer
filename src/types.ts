export type DefaultItemShape = { id: any };
export type DefaultItemActionShape = { payload: DefaultItemShape };
export type DefaultStateShape = { list: DefaultItemShape[] };
export type MatcherFactory<TInput, TItem> = (input: TInput) => (item: TItem) => boolean;
