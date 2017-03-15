import { Action } from 'redux';
import { DefaultItemActionShape, DefaultItemShape } from './types';

export default function defaultKeyPredicate(action: Action & DefaultItemActionShape) {
    const id = action.payload.id;
    return (item: DefaultItemShape) => {
        return item.id === id;
    };
}
