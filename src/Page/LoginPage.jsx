import LoginForm from '../Components/Login/LoginForm';
import React, {useEffect} from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../RecoilState';
import { useNavigate } from "react-router-dom";
import logo from './logo2.png';

function Login() {    
  const user_id = useRecoilValue(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (user_id !== null) {
      navigate('/main', { replace: true });
    }
  }, [user_id, navigate]);
  return (
    <>
    <img className='logo' src={logo} alt='로고이미지'/> 
    <LoginForm/>
    </>
  );
}

export default Login;
