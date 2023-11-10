import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import LoginForm from './Components/Login/LoginForm';
import Timer from './Components/Timer/Timer';

function App() {
  return (
    <RecoilRoot>
      <Timer />
      <Calendar />
      <LoginForm />
    </RecoilRoot>
  );
}

export default App;
