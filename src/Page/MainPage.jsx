import { RecoilRoot } from 'recoil';
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  function myInfo() {
    navigate('/userInfo');
  }
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

/* <Friends/>
<button onClick={myInfo}>내정보</button> */

export default Main;
