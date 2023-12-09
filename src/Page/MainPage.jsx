import { useRecoilValue } from 'recoil';
import { userState } from '../RecoilState';
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import logo from './logo2.png';
import './MainPage.css';

function Main() {
  const user_id = useRecoilValue(userState);
  console.log(user_id);
  const navigate = useNavigate();
  function myInfo() {
    navigate('/userInfo');
  }
  function toMain() {
    navigate('/main')
  }
  return (
    <>
    <header>
      <img className='logo' onClick={toMain} src={logo} alt='로고이미지'/> 
      <FaUser className='toMyInfo' onClick={myInfo} size="40"/>
    </header>
    <div className='mainContainer'>
    <Friends/>
      <div className='calendarContainer'>
        <p className='template'>나의 기록</p>
        <Calendar className='calendar' />
      </div>
      <div className='timerTodoContainer'>
        <p className='template'>To-do List</p>

        <TodoListModule className='TodoList' />
      </div>
      
    </div>
    </> 
  );
}
//<TimerModal className='Timer' />

/* <Friends/>*/


export default Main;
