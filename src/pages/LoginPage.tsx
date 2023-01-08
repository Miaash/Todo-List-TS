import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthStateChange } from '../hooks/hooks';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginPage = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const navigate = useNavigate();

  // 로그인된 상태로 로그인페이지 접근 시, 메인페이지로 이동
  useAuthStateChange();

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
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
    setPwd(e.target.value);
    if (e.target.value.length < 6) {
      setPwdError(false);
    } else if (e.target.value.length >= 6) {
      setPwdError(true);
    }
  };

  // 로그인 핸들러
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 세션에 (uid) 저장하기 => 로그인 유지 시 필요
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      signInWithEmailAndPassword(auth, email, pwd)
        .then((res) => {
          alert('로그인 되었습니다.');
          navigate('/usertodo');
          setIsLogin(true);
        })
        .catch((err) => {
          if (err.code === 'auth/user-not-found') {
            alert('계정이 없습니다. 회원가입을 진행해주세요.');
            navigate('/signup');
          } else {
            alert(err.message);
          }
        });
    });
  };

  // 소셜 로그인 핸들러
  const onSocialClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    const data = await auth.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <MainWrapper>
      <Header />
      <MainContents>
        <TitleBox>Login</TitleBox>
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
            <Button title={'Login'} />
          ) : (
            <Button
              className={'disabled'}
              disabled={true}
              style={{ cursor: 'no-drop' }}
              title={'Login'}
            />
          )}
        </FormBox>
        <ButtonBox>
          <Button
            name={'google'}
            className={'google-btn'}
            onClick={onSocialClickHandler}
            title={'Login with Google'}
          >
            <FontAwesomeIcon icon={faGoogle} className="icon" />
          </Button>
        </ButtonBox>
        <TextBox>
          <p>계정이 없으신가요?</p>
          <span onClick={() => navigate('/signup')}>가입하기</span>
        </TextBox>
      </MainContents>
    </MainWrapper>
  );
};

export default LoginPage;

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
    outline: none;
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
    color: #15b887;
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
    color: #15b887;
    font-size: 16px;
  }
  .wrong {
    color: red;
    font-size: 16px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .google-btn {
    width: 370px;
    margin-top: 10px;
    height: 57px;
    font-size: 20px;
    background-color: #ffffff;
    border: 1px solid #bcbcbc;
    border-radius: 10px;
    color: #959595;
    :hover {
      cursor: pointer;
      background-color: #13a478;
      color: #ffffff;
    }
    .icon {
      margin-right: 10px;
    }
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
