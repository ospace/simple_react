import { bindEmit, createReducer } from 'utils/cmm';
import path from 'path';
const scriptName = path.basename(__filename).split('.')[0];

console.log('> scriptName:', scriptName);

// const ctx = {
//   initialState: {
//     auth: null,
//     isAuth: false,
//   },
//   events: [
//     {
//       type: 'LOGIN',
//       params: ['value'],
//       handler: (state, { value }) => ({ auth: value, isAuth: !!value }),
//     },
//   ],
// };

const authKey = '_auth';
const initialState = {
  auth: null,
  isAuth: false,
};

const auth = localStorage.getItem(authKey);
if (auth) {
  initialState.auth = JSON.parse(auth);
  initialState.isAuth = !!initialState.auth;
}

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

export const emitLogin = bindEmit(LOGIN, 'value');
export const emitLogout = bindEmit(LOGOUT);

const handlers = {};
handlers[LOGIN] = (state, { value }) => {
  const ret = { auth: value, isAuth: !!value };
  value && localStorage.setItem(authKey, JSON.stringify(value));
  return ret;
};
handlers[LOGOUT] = () => {
  localStorage.removeItem(authKey);
  return { auth: null, isAuth: false };
};

export default createReducer(handlers, initialState);
