import store from './store';
import * as actions from './actions';

const unsubscribe = store.subscribe(() => {
  console.log('State changed', store.getState());
});

store.dispatch(actions.bugAdded('hehe'));

store.dispatch(actions.bugRemove(1));

unsubscribe();
