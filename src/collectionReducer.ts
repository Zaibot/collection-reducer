import { Action } from 'redux';
import { MatcherFactory } from './types';

export default function collectionReducer<TState, TItem>(
    allReducer: (state: TState, action: Action) => TState,
    itemReducer: (state: TState, action: Action) => TState,
    keyPredicate: MatcherFactory<Action, TItem>,
) {
    return (state: TState, action: Action): TState => {
        state = allReducer(state, action);
        state = itemReducer(state, action);
        return state;
    };
}
