import { Action } from 'redux';
import { DefaultItemShape, DefaultStateShape, MatcherFactory } from './types';

export default function defaultItemSelector<TState extends DefaultStateShape, TItem extends DefaultItemShape>(
  state: TState,
  keyPredicate: MatcherFactory<Action, TItem>) {
    return (action: Action) => {
        const key = keyPredicate(action);
        for (const item of state.list) {
            if (key(item as TItem)) {
                return item;
            }
        }
    };
}
