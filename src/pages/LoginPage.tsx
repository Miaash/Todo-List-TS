import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { useLoginStore } from "../store/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { isLogin, setIsLogin } = useLoginStore();
  const navigate = useNavigate();

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const changePwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  // 로그인 핸들러
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("로그인 성공!");
        navigate("/");
        setIsLogin(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={changeEmailHandler} />
        <label htmlFor="password">PassWord</label>
        <input type="password" id="password" onChange={changePwdHandler} />
        <button>Login</button>
      </form>
      <div>
        계정이 없으신가요?
        <span onClick={() => navigate("/signup")}>가입하기</span>
      </div>
    </div>
  );
};

export default LoginPage;
