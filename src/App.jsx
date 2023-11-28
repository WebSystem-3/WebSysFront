import { RecoilRoot } from 'recoil';
import Calendar from './Components/Calendar/Calender';
import LoginForm from './Components/Login/LoginForm';

import TimerModal from './Components/Timer/TimerModal';
import TodoListModule from './Components/TodoList/TodoListModule';

import SignUp from './Components/SignUp/SignUp';
import Timer from './Components/Timer/Timer';
import UserEdit from './Components/UserEdit/UserEdit';
import UserInfo from './Components/UserInfo/UserInfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Page/LoginPage';
import SignUpPage from './Page/SignUpPage';
import MainPage from './Page/MainPage';
//import Friends from './Components/Friends/Friends';

function App() {
  /*return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path={"/user/calendar"} element={<Calendar />}></Route>
      </Routes>
    </BrowserRouter>
      <LoginForm />
      
      <TimerModal />
      <TodoListModule />

      <SignUp />
      <UserEdit />
      <UserInfo />
    </RecoilRoot>
  );*/
  return (
    <RecoilRoot>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LoginPage />}></Route>
        <Route path={"/signup"} element={<SignUpPage />}></Route>
        <Route path={"/main"} element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
    
    </RecoilRoot>
  );
}

export default App;
