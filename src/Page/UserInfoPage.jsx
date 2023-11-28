import UserInfo from '../Components/UserInfo/UserInfo';
import { useRecoilState } from 'recoil';
import { userState } from '../RecoilState';
import { useNavigate } from "react-router-dom";

function Userinfo() {
    const navigate = useNavigate();
    const [user_id, setUser_id] = useRecoilState(userState);

    function toUserEdit(){
        navigate("/");
    }
    function logout(){
        navigate("/");
        setUser_id = null;
    }
  return (
    <>
      <UserInfo />
      <button onClick={toUserEdit}>정보수정</button>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}

export default Userinfo;