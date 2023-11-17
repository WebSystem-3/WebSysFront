import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import LoginForm from './Components/Login/LoginForm';
import TimerModal from './Components/Timer/TimerModal';
import TodoListModule from './Components/TodoList/TodoListModule';

function App() {
  return (
    <RecoilRoot>
      <Calendar />
      <TimerModal />
      <LoginForm />
      <TodoListModule />
    </RecoilRoot>
  );
}

export default App;
