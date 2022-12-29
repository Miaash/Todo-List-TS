import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import Header from "../components/common/Header";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const changePwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  // 회원가입 핸들러
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("회원가입 성공!");
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <MainWrapper>
      <Header />
      <MainContents>
        <TitleBox>SignUp</TitleBox>
        <FormBox onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 작성해주세요"
            onChange={changeEmailHandler}
          />
          <label htmlFor="password">PassWord</label>
          <input
            type="password"
            id="password"
            placeholder="6자 이상 작성해주세요"
            onChange={changePwdHandler}
          />
          <button>SignUp</button>
        </FormBox>
        <TextBox>
          <p>계정이 없으신가요?</p>
          <span onClick={() => navigate("/login")}>로그인하기</span>
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
    margin-bottom: 20px;
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
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
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
