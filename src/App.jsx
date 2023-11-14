import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import LoginForm from './Components/Login/LoginForm';
import SignUp from './Components/SignUp/SignUp';
import Timer from './Components/Timer/Timer';
import UserEdit from './Components/UserEdit/UserEdit';
import UserInfo from './Components/UserInfo/UserInfo';

function App() {
  return (
    <RecoilRoot>
      <Timer />
      <Calendar />
      <LoginForm />
      <SignUp />
      <UserEdit />
      <UserInfo />
    </RecoilRoot>
  );
}

export default App;
