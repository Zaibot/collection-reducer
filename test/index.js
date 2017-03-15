const assert = require('assert');
const { defaultCollection, add, remove } = require('../es5/index');

function reducerCollection(state = { list: [] }, action) {
  if (action.type === 'ADD') {
    return Object.assign({}, state, { list: add(state.list, { id: action.payload.id }) });
  }
  if (action.type === 'REMOVE') {
    return Object.assign({}, state, { list: remove(state.list, x => x.id === action.payload.id) });
  }
  if (action.type === 'CLEAR') {
    return Object.assign({}, state, { list: [] });
  }
  return state;
}

function reducerItem(item, action) {
  if (action.type === 'ADD') {
    return Object.assign({}, item, action.payload);
  }
  if (action.type === 'APPLY') {
    return Object.assign({}, item, action.payload);
  }
  return item;
}

const { reducer } = defaultCollection(reducerCollection, reducerItem);

describe('collectionReducer', () => {
  it('should bla', () => {
    const a = undefined;

    const b = reducer(a, {});
    assert.deepEqual(b, { list: [] });

    const c = reducer(b, { type: 'ADD', payload: { id: 1, text: 'Hallo 1' } });
    assert.deepEqual(c, { list: [ { id: 1, text: 'Hallo 1' } ] });

    const d = reducer(c, { type: 'ADD', payload: { id: 2, text: 'Hallo 2' } });
    assert.deepEqual(d, { list: [ { id: 1, text: 'Hallo 1' }, { id: 2, text: 'Hallo 2' } ] });

    const e = reducer(d, { type: 'ADD', payload: { id: 3, text: 'Hallo 3' } });
    assert.deepEqual(e, { list: [ { id: 1, text: 'Hallo 1' }, { id: 2, text: 'Hallo 2' }, { id: 3, text: 'Hallo 3' } ] });

    const f = reducer(e, { type: 'ADD', payload: { id: 4, text: 'Hallo 4' } });
    assert.deepEqual(f, { list: [ { id: 1, text: 'Hallo 1' }, { id: 2, text: 'Hallo 2' }, { id: 3, text: 'Hallo 3' }, { id: 4, text: 'Hallo 4' } ] });

    const g = reducer(f, { type: 'APPLY', payload: { id: 4, text: 'Hallo 4 nieuw man' } });
    assert.deepEqual(g, { list: [ { id: 1, text: 'Hallo 1' }, { id: 2, text: 'Hallo 2' }, { id: 3, text: 'Hallo 3' }, { id: 4, text: 'Hallo 4 nieuw man' } ] });

    const h = reducer(g, { type: 'REMOVE', payload: { id: 2 } });
    assert.deepEqual(h, { list: [ { id: 1, text: 'Hallo 1' }, { id: 3, text: 'Hallo 3' }, { id: 4, text: 'Hallo 4 nieuw man' } ] });
  });
});
