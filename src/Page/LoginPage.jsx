import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { userState } from '../RecoilState';
import LoginForm from '../Components/Login/LoginForm';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    function tosignup(){
        navigate("/signup")
    }
    function login(){
        navigate("/main");
    }
    
  return (   
    <>      <LoginForm/>
      <button onClick={tosignup}>회원가입</button>
      <button onClick={login}>로그인2</button>
      </>
  );
}

export default Login;