import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [isIdValid, setIdValid] = useState(false);
  const navigate = useNavigate();

  const handleValidation = async () => {
    const userData = {
      account: id,
    };
    await fetch('http://43.201.197.131:8080/user/validation', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data.message);
          if (response.status === 200) {
            alert(data.message);
            setIdValid(true);
            console.log('사용가능한 아이디입니다');
          } else {
            alert(data.message);
            console.log('중복된 아이디 입니다');
            setIdValid(false);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSignup = async () => {
    const userData = {
      account: id,
      password: password,
      name: name,
    };
    await fetch('http://43.201.197.131:8080/user/signup', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            console.log('');
            navigate('/');
          } else {
            alert(data.Message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h>회원가입</h>
      <br />
      <label>ID
        <input
          type='text'
          className='inputSignUp'
          onChange={(event) => setId(event.target.value)}
        />
      </label>
      <button type='button' className = 'valBt' onClick={handleValidation}>
        중복확인
      </button>
      <p>비밀번호
        <input
          type='password'
          className='inputSignUp'
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <p>비밀번호 확인
        <input
          type='password'
          className='inputSignUp'
          onChange={(event) => setPassword2(event.target.value)}
        />
        <div>
          {password !== '' && password === password2 ? (
            <div>비밀번호가 일치합니다</div>
          ) : (
            password !== '' &&
            password2 !== '' && <div>비밀번호가 일치하지 않습니다</div>
          )}
        </div>
      </p>
      <p>이름
        <input
          type='text'
          className='inputSignUp'
          onChange={(event) => setName(event.target.value)}
        />
      </p>
      <br />
      <button type='button' className="loginBt" onClick={handleSignup} disabled={!isIdValid}>
        회원가입
      </button>
    </div>
  );
}

export default SignUp;
