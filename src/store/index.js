/*
리덕스 사용 주의
* 유일한 스토어 존재
* 상태는 읽기 전용(불변성 유지)
* 리듀서는 순수함수

사용예는 Test03를 참조
*/

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import counter from './counter';
import auth from './auth';

const states = { counter, auth };

// logger 미들웨어
//  store -> next -> action
const logger =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.group(`> redux action: %c${action.type}`, 'font-weight: 600;');
    console.log('before state:', getState());
    const result = next(action);
    console.log('after state:', getState());
    console.groupEnd();
    return result;
  };

// thunk 미들웨어
/* dispatch 호출하는 곳에서 액션으로 함수 사용 가능
dispatch((dispatch, getState) => {
  dispatch({ type: 'FOO' });
  dispatch({ type: 'BAR' });
});

별도 함수로 처리하기에 async/await도 가능하다.

spatch(async (dispatch, getState) => {
  const value = await foo();
  dispatch({ type:'FOO', value });
});
*/
const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) =>
    'function' === typeof action ? action(dispatch, getState) : next(action);

const reducers = combineReducers(states);
// middleware 여러개인 경우 applyMiddleware(ware1, ware2)
// chain-reaction으로 실행순서에 주의
let middleware = applyMiddleware(thunk, logger);
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware);
}

export default createStore(reducers, middleware);
