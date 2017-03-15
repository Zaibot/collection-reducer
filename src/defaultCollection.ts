import { Action } from 'redux';
import collectionReducer from './collectionReducer';
import defaultItemReducer from './defaultItemReducer';
import { DefaultStateShape } from './types';

export default function defaultCollection<TItem extends { id: any }>(
    allReducer: (state: DefaultStateShape, action: Action) => DefaultStateShape,
    itemReducer: (state: TItem, action: Action) => TItem,
) {
    const key = (action) => (item) => item.id === action.payload.id;
    return {
        reducer: collectionReducer<{ list: any[] }, TItem>(allReducer, defaultItemReducer(key, itemReducer), key),
        selector: (state: any) => state as { list: TItem[] },
    };
}
