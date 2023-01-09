import { useEffect } from 'react';
import styled from 'styled-components';
import { useLoginStore } from '../../store/store';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import TodoLogo from '../../assets/TodoLogo.svg';
import Swal from 'sweetalert2';

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginStore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      }
    });
  }, []);

  // 로그아웃 핸들러
  const logoutHandler = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97753',
      cancelButtonColor: '#909090',
      cancelButtonText: '취소',
      confirmButtonText: '로그아웃',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            icon: 'success',
            title: '로그아웃 되었습니다.',
            confirmButtonColor: '#15b887',
          });
          await signOut(auth);
          setIsLogin(false);
          window.location.replace('/');
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: '로그인에 실패했습니다.',
            text: 'err.message',
            confirmButtonColor: '#15b887',
          });
        }
      }
    });
  };
  return (
    <MainWrapper>
      <HeaderContainer>
        <HeaderTitle src={TodoLogo} onClick={() => navigate('/')} />
        <LoginSection>
          {isLogin === true ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <button onClick={() => navigate('/login')}>Login</button>
          )}
        </LoginSection>
      </HeaderContainer>
    </MainWrapper>
  );
};

export default Header;

const MainWrapper = styled.header`
  display: flex;
  position: relative;
  position: sticky;
  z-index: 10000;
  width: 100%;
  border-bottom: 1px #d0d0d0 solid;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
`;

const HeaderTitle = styled.img`
  width: 110px;
  :hover {
    cursor: pointer;
  }
`;

const LoginSection = styled.div`
  position: absolute;
  right: 0;
  margin-right: 100px;
  button {
    font-size: 15px;
    background-color: #fff;
    border: none;
    :hover {
      cursor: pointer;
      color: #15b887;
    }
  }
`;
