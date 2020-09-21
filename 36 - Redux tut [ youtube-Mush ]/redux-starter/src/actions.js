import * as actions from './actionType';

export function bugAdded(description) {
  return {
    type: actions.BUG_ADDED,
    payload: {
      description: description,
    },
  };
}

export function bugRemove(id) {
  return {
    type: actions.BUG_REMOVE,
    payload: {
      id: id,
    },
  };
}

export const bugResolve = (id) => ({
  type: actions.BUG_RESOLVE,
  payload: {
    id,
  },
});
