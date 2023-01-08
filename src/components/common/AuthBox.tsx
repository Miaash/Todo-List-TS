import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

interface IProps {
  children: string;
}

const AuthBox = ({ children }: IProps) => {
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
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
        alert('회원가입 성공!');
        navigate('/login');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <h2>{children}</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={changeEmailHandler} />
        <label htmlFor="password">PassWord</label>
        <input type="password" id="password" onChange={changePwdHandler} />
        <button>{children}</button>
      </form>
    </div>
  );
};

export default AuthBox;
