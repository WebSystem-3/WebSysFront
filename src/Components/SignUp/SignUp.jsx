import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp({}) {
  const [id, setId] = useState(''); //회원가입성공하면 네비게이트 페이지에서 구현
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [isIdValid, setIdValid] = useState(false);
  const [isValCalled, setValCalled] = useState(false); //이미 존재하는 ID입니다 수정필요
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
        setValCalled(true);
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
          if (response.status === 201) {
            alert('가입성공: ' + data.message);
            console.log('');
            navigate('/');
          } else {
            alert('가입실패: ' + data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='signUpForm'>
      <p className='pagetitle'>회원가입</p>
      <div className='signupContainer'>
        <div className='texts'>
          <p>ID</p>
          <p>비밀번호</p>
          <p>비밀번호 확인</p>
          <p>이름</p>
        </div>
      <div className='inputs'>
        <input
            type='text'
            className='inputSignUp'
            onChange={(event) => setId(event.target.value)}
          />
        {id === '' || id.length>=8 ? (
          <></>
        ) : (
          <div className='warning'>ID는 8자 이상이어야 합니다.</div>
        )}
        {!isIdValid ? (
          isValCalled ? (
            <div className='warning'>이미 존재하는 ID입니다.</div>
          ) : (
            <></>
            )
          ) : (
            <></>
          )}
          <input
            type='password'
            className='inputSignUp'
            onChange={(event) => setPassword(event.target.value)}
          />
        {password === '' || (password.length>=8 && password.length<=16) ? (
          <></>
        ) : (
          <div className='warning'>비밀번호는 8자~16자이어야 합니다.</div>
        )}
          <input
            type='password'
            className='inputSignUp'
            onChange={(event) => setPassword2(event.target.value)}
          />
          {password !== '' && password === password2 ? (
            <></>
          ) : (
            password !== '' &&
            password2 !== '' && <div className='warning'>비밀번호가 일치하지 않습니다</div>
          )}
          <input
            type='text'
            className='inputSignUp'
            onChange={(event) => setName(event.target.value)}
          />
      </div>
      <button className = 'valBt' onClick={handleValidation}>중복확인</button>
    </div>
      <button type='button' className="signUpBt2" onClick={handleSignup} disabled={!isIdValid}>
        회원가입
      </button>
    </div>
  );
}

export default SignUp;
