import LoginForm from '../Components/Login/LoginForm';
import { useRecoilValue } from 'recoil';
import { userState } from '../RecoilState';
import { useNavigate } from "react-router-dom";

function Login() {    
  const user_id = useRecoilValue(userState);
  const navigate = useNavigate();
  if (user_id !== null){
    navigate('/main');
  }
  return (   
    <>      
      <LoginForm/>
    </>
  );
}

export default Login;