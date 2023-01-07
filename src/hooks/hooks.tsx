import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import firebase from 'firebase/compat/app';

export const useAuthStateChange = () => {
  const navigate = useNavigate();

  // 로그인된 상태로 로그인페이지 접근 시, 메인페이지로 이동
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });
  }, []);
};
