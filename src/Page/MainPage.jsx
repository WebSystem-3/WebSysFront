import { useRecoilValue } from 'recoil';
import { userState } from '../RecoilState';
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function Main() {
  const user_id = useRecoilValue(userState);
  console.log(user_id);
  const navigate = useNavigate();
  function myInfo() {
    navigate('/userInfo');
  }
  return (
    <div className='mainContainer'>
      <div className='calendarContainer'>
        <p className='template'>나의 기록</p>
        <Calendar className='calendar' />
      </div>
      <div className='timerTodoContainer'>
        <p className='template'>To-do List</p>

        <TodoListModule className='TodoList' />
      </div>
    </div>
  );
}
//<TimerModal className='Timer' />

/* <Friends/>
<button onClick={myInfo}>내정보</button> */

export default Main;
