import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../RecoilState';

const LoginForm = () => {
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    /* */
    setUser({ username });
  };

  return (
    <div>
      {user ? (
        <div>
          <p>로그인되었습니다! 사용자: {user.username}</p>
        </div>
      ) : (
        <form>
          <label>
            사용자명:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            로그인
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;