import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Page/LoginPage';
import SignUpPage from './Page/SignUpPage';
import MainPage from './Page/MainPage';
import UserInfoPage from './Page/UserInfoPage';
import UserEditPage from './Page/UserEditPage';
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
        <Route path={"/userInfo"} element={<UserInfoPage />}></Route>
        <Route path={"/userEdit"} element={<UserEditPage />}></Route>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
