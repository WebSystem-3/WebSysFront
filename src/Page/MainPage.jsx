import { useRecoilValue } from 'recoil';
import { userState } from '../RecoilState';
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from 'react-router-dom';

function Main() {
  const user_id = useRecoilValue(userState);
  console.log(user_id);
  const navigate = useNavigate();
  function myInfo() {
    navigate('/userInfo');
  }
  return (
    <>
      <Calendar className='calendar' />
      <div className='timerTodoContainer'>
        <TimerModal className='Timer' />
        <TodoListModule className='TodoList' />
      </div>
    </>
  );
}

/* <Friends/>
<button onClick={myInfo}>내정보</button> */

export default Main;
