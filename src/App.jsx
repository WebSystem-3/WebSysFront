import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import LoginForm from './Components/Login/LoginForm';
<<<<<<< HEAD
import TimerModal from './Components/Timer/TimerModal';
import TodoListModule from './Components/TodoList/TodoListModule';
=======
import SignUp from './Components/SignUp/SignUp';
import Timer from './Components/Timer/Timer';
import UserEdit from './Components/UserEdit/UserEdit';
import UserInfo from './Components/UserInfo/UserInfo';
>>>>>>> dcf95f1b3fd6f09128503c5df950636edcf4159a

function App() {
  return (
    <RecoilRoot>
      <Calendar />
      <TimerModal />
      <LoginForm />
<<<<<<< HEAD
      <TodoListModule />
=======
      <SignUp />
      <UserEdit />
      <UserInfo />
>>>>>>> dcf95f1b3fd6f09128503c5df950636edcf4159a
    </RecoilRoot>
  );
}

export default App;
