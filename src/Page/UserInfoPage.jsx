import UserInfo from '../Components/UserInfo/UserInfo';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import logo from './logo2.png';
import './UserInfoPage.css';

function Userinfo() {    
  const navigate = useNavigate();
  function toMain(){
    navigate("/main");
  } 
  return (
    <div>
      <header>
        <img className='logo' onClick={toMain} src={logo} alt='로고이미지'/> 
        <TiHome className='toMain' onClick={toMain} size ="45"/>
      </header>
      <UserInfo />
    </div>
  );
}

export default Userinfo;