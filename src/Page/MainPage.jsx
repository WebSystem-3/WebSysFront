import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import TimerModal from './Components/Timer/TimerModal';
import TodoListModule from './Components/TodoList/TodoListModule';

function Main() {
  return (
    <RecoilRoot>
      <Calendar className='calendar' />
      <div className='timerTodoContainer'>
        <TimerModal className='Timer' />
        <TodoListModule className='TodoList' />
      </div>
    </RecoilRoot>
  );
}

export default Main;
