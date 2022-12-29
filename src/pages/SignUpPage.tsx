import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

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
    <div>
      <h2>SignUp</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={changeEmailHandler} />
        <label htmlFor="password">PassWord</label>
        <input type="password" id="password" onChange={changePwdHandler} />
        <button>SignUp</button>
      </form>
      <div>
        계정이 이미 있으신가요?
        <span onClick={() => navigate("/login")}>로그인하기</span>
      </div>
    </div>
  );
};

export default SignUpPage;
