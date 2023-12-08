import UserEdit from '../Components/UserEdit/UserEdit';
import { useNavigate } from 'react-router-dom';
import logo from './logo2.png';
function Useredit() {
  const navigate = useNavigate();
  function toMain(){
    navigate('/main');
  }
  return (
    <>
      <img className='logo' onClick={toMain} src={logo} alt='로고이미지'/> 
      <UserEdit />
    </>
  );
}

export default Useredit;