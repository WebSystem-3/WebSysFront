import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import LoginForm from './Components/Login/LoginForm';
import SignUp from './Components/SignUp/SignUp';
import Timer from './Components/Timer/Timer';

function App() {
  return (
    <RecoilRoot>
      <Timer />
      <Calendar />
      <LoginForm />
      <SignUp />
    </RecoilRoot>
  );
}

export default App;
