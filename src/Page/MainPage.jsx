import { useRecoilValue } from 'recoil';
import { userState } from '../RecoilState';
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import './MainPage.css';
import logo from './logo2.png';

function Main() {
  const user_id = useRecoilValue(userState);
  console.log(user_id);
  const navigate = useNavigate();
  function myInfo() {
    navigate('/userInfo');
  }
<<<<<<< HEAD
  // function whoIam() {
  //   let User = '';
  //   if (user_id == myuserId) {
  //     User = '나';
  //   } else {
  //     User = '친구';
  //   }
  //   return User;
  // }

=======
  function toMain() {
    navigate('/main')
  }
>>>>>>> 904601b74be911715e962de1949608369a7b7a11
  return (
    <>
    <header>
      <img className='logo' onClick={toMain} src={logo} alt='로고이미지'/> 
      <FaUser className='toMyInfo' onClick={myInfo} size="40"/>
    </header>
    <div className='mainContainer'>
    <Friends/>
      <div className='calendarContainer'>
        <p className='calendar-template'>나의 기록</p>
        <Calendar className='calendar' />
      </div>
      <div className='timerTodoContainer'>
        <TimerModal />
        <p className='todolist-template'>To-do List</p>

        <TodoListModule className='TodoList' />
      </div>
      
    </div>
    </> 
  );
}
//<TimerModal className='Timer' />

/* <Friends/>*/


export default Main;
