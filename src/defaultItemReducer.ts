import { Action } from 'redux';
import { DefaultItemShape, DefaultStateShape, MatcherFactory } from './types';

export default function defaultItemReducer<TState extends DefaultStateShape, TItem extends DefaultItemShape>(
    keyPredicate: MatcherFactory<Action, TItem>,
    itemReducer: (state: TItem, action: Action) => TItem) {
    return (state: TState, action: Action): TState => {
        const key = keyPredicate(action);
        if (key) {
            let changes = 0;
            const list = state.list.map((item: TItem) => {
                if (key(item)) {
                    const item2 = itemReducer(item, action);
                    if (item !== item2) {
                        changes++;
                        return item2;
                    }
                }
                return item;
            });
            if (changes) {
                state = { ...(state as any), list };
            }
        }
        return state;
    };
}
