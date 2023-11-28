import { RecoilRoot, useRecoilValue } from 'recoil';
import UserInfo from '../Components/UserInfo/UserInfo';
import { useNavigate } from "react-router-dom";

function userInfo() {
    const navigate = useNavigate();
    const user_id = useRecoilValue(userState);

    function toUserEdit(){
        navigate("/");
    }
    function logout(){
        navigate("/");
        user_id = null;
    }
  return (
    <RecoilRoot>
      <UserInfo />
      <button onClick={toUserEdit}>정보수정</button>
      <button onClick={logout}>로그아웃</button>
    </RecoilRoot>
  );
}

export default userInfo;