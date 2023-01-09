import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStateChange } from '../hooks/hooks';
import Header from '../components/common/Header';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const navigate = useNavigate();

  // 로그인된 상태로 회원가입페이지 접근 시, 메인페이지로 이동
  useAuthStateChange();

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    // 이메일 유효성 검사
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const changePwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const password = e.target.value.trim();
    setPwd(password);
    // 패스워드 유효성 검사
    if (password.length < 6) {
      setPwdError(false);
    } else if (password.length >= 6) {
      setPwdError(true);
    }
  };

  // 회원가입 핸들러
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          text: '환영합니다. 여러분의 Todo를 기록하세요.',
          confirmButtonColor: '#15b887',
        });
        navigate('/login');
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          Swal.fire({
            icon: 'error',
            title: '회원가입에 실패했습니다.',
            text: '이미 가입된 계정입니다. 로그인을 해주세요.',
            confirmButtonColor: '#15b887',
          });
          navigate('/login');
        } else {
          Swal.fire({
            icon: 'error',
            title: '회원가입에 실패했습니다.',
            text: '다시 시도해주세요',
            confirmButtonColor: '#15b887',
          });
        }
      });
  };

  return (
    <MainWrapper>
      <Header />
      <MainContents>
        <TitleBox>SignUp</TitleBox>
        <FormBox onSubmit={submitHandler}>
          <EmailBox>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 작성해주세요"
              onChange={changeEmailHandler}
            />
            {emailError ? (
              <p className="correct">올바른 형식입니다.</p>
            ) : (
              <p className="wrong">이메일 형식에 맞지 않습니다.</p>
            )}
          </EmailBox>
          <PwdBox>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="6자 이상 작성해주세요"
              onChange={changePwdHandler}
            />
            {pwdError ? (
              <p className="correct">올바른 형식입니다.</p>
            ) : (
              <p className="wrong">6자 이상 입력해주세요.</p>
            )}
          </PwdBox>
          {pwdError && emailError ? (
            <button>SignUp</button>
          ) : (
            <button
              className="disabled"
              disabled={true}
              style={{ cursor: 'no-drop' }}
            >
              SignUp
            </button>
          )}
        </FormBox>
        <TextBox>
          <p>계정이 있으신가요?</p>
          <span onClick={() => navigate('/login')}>로그인하기</span>
        </TextBox>
      </MainContents>
    </MainWrapper>
  );
};

export default SignUpPage;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const MainContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px 50px;
  width: 100%;
  height: 100%;
`;

const TitleBox = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 600;
`;

const FormBox = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  label {
    font-size: 20px;
    width: 60px;
    height: 30px;
  }
  input {
    width: 350px;
    height: 40px;
    font-size: 20px;
    padding: 7px;
  }
  button {
    height: 57px;
    font-size: 23px;
    background-color: #15b887;
    border: none;
    border-radius: 10px;
    color: #fff;
    :hover {
      cursor: pointer;
      background-color: #13a478;
    }
  }

  .disabled {
    background-color: #bcbcbc;
    :hover {
      cursor: pointer;
      background-color: #bcbcbc;
    }
  }
`;

const EmailBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .correct {
    color: green;
    font-size: 16px;
  }
  .wrong {
    color: red;
    font-size: 16px;
  }
`;

const PwdBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .correct {
    color: green;
    font-size: 16px;
  }
  .wrong {
    color: red;
    font-size: 16px;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-top: 10px;
  p {
    margin-right: 10px;
  }
  span {
    font-weight: 600;
    color: #15b887;
    :hover {
      cursor: pointer;
    }
  }
`;
