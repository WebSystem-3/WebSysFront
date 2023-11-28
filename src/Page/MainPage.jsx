import { RecoilRoot } from 'recoil';
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
    function myInfo(){
        navigate("/userInfo");
    }
  return (
    <RecoilRoot>
      <Calendar className='calendar' />
      <div className='timerTodoContainer'>
        <TimerModal className='Timer' />
        <TodoListModule className='TodoList' />
        <button onClick={myInfo}>내정보</button>
      </div>
      
    </RecoilRoot>
  );
}

export default Main;
