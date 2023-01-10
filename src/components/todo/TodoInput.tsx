import React, { useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../firebase/firebaseConfig';

const TodoInput = ({ userUid }: { userUid: string }) => {
  const [text, setText] = useState('');
  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createTodo = {
      text: text,
      isChecked: false,
      createAt: new Date().toISOString().substring(0, 10),
      creatorId: userUid,
    };
    try {
      await firestore.collection(`${userUid}`).add(createTodo);
      setText('');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <MainWrapper>
      <FormBox onSubmit={onSubmitHandler}>
        <InputBox>
          <input
            type="text"
            placeholder="Todo를 입력하세요."
            onChange={textChangeHandler}
            value={text}
          />
        </InputBox>
        <BtnBox>
          <Btn>확인</Btn>
        </BtnBox>
      </FormBox>
    </MainWrapper>
  );
};

export default TodoInput;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-top: 30px;
`;

const FormBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52%;
  height: 80%;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 87%;
  height: 100%;
  padding: 10px;
  input {
    width: 100%;
    height: 90%;
    padding: 0 40px;
    font-size: 18px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: #e3e3e3;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  background-color: #15b887;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  :hover {
    cursor: pointer;
    background-color: #13a478;
  }
`;
