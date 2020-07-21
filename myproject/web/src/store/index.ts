import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';
import rootSaga from './sagas';
import history from './history';

const sagaMiddleware = createSagaMiddleware();
const configureStore = (preloadedState?: any) => {
  const composeEnhancer: typeof compose =
    (process.env.NODE_ENV !== 'production' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancer(
      applyMiddleware(routerMiddleware(history), createLogger(), sagaMiddleware)
    )
  );
  if (process.env.NODE_ENV === 'development') {
    if ((module as any).hot) {
      (module as any).hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }
  return store;
};
const store = configureStore();
sagaMiddleware.run(rootSaga);
export default store;
