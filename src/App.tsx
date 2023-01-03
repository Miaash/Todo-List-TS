import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TodoListPage from './pages/TodoListPage';
import { auth } from './firebase/firebaseConfig';

// export interface AuthType {
//   isLogin: boolean;
//   setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
// }

const App: React.FC = () => {
  // const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    // 사용자 로그인 변화를 추적함
    // user가 존재하면(로그인 성공시) 로그인 상태 true, 실패 시 로그인 상태 false
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage isLogin={isLogin} />} />
          <Route
            path="/login"
            element={<LoginPage setIsLogin={setIsLogin} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/usertodo" element={<TodoListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
