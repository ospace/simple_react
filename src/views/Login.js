import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { emitLogin } from 'store/auth';
import { login } from 'api/auth';

export default function Login() {
  const [user, setUser] = useState({ loginId: '', password: '' });
  const env = process.env;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin() {
    try {
      if (!validate()) {
        return;
      }
      const res = await login(user);
      emitLogin(dispatch, res);
      navigate('/');
    } catch (ex) {
      alert(ex);
    }
  }

  function validate() {
    if (!user.loginId) {
      return alert('loginid required: ex) foo');
    }
    if (!user.password) {
      return alert('password required: ex) 1');
    }

    return true;
  }

  return (
    <>
      <h1>
        Login
        <br />({env.REACT_APP_ENV}/{env.NODE_ENV})
      </h1>
      <div>
        <input
          type="text"
          placeholder="loginid"
          value={user.loginId}
          onChange={({ target: { value } }) => {
            setUser({ ...user, loginId: value });
          }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          value={user.password}
          onChange={({ target: { value } }) =>
            setUser({ ...user, password: value })
          }
        />
      </div>
      <div>
        <button onClick={onLogin}>Login</button>
      </div>
      {/* <div>{env.REACT_APP_FOO}</div>
      <div>{env.REACT_APP_AUTH}</div> */}
    </>
  );
}
