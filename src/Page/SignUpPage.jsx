import SignUp from '../Components/SignUp/SignUp';
import { useNavigate } from 'react-router-dom';
import logo from './logo2.png';

function Signup() {    
  const navigate = useNavigate();
  function toLogin(){
    navigate('/');
  }
  return (
    <>
      <img className='logo' onClick={toLogin} src={logo} alt='로고이미지'/>  
      <SignUp/>
    </>
  );
}

export default Signup;