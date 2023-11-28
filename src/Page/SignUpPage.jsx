import { RecoilRoot } from 'recoil';
import LoginForm from '../Components/Login/LoginForm';
import SignUp from '../Components/SignUp/SignUp';
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    function signup(){
        navigate("/");
    }
    
  return (
    <RecoilRoot>
      <SignUp />
      <button onClick={signup}>회원가입2</button>
    </RecoilRoot>
  );
}

export default Signup;