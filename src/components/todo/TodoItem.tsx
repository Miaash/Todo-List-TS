import React, { useState, useEffect } from 'react';
import { todoType } from '../../types/\btypes';
import { firestore } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseConfig';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
interface IProps {
  todo: todoType;
}

const TodoItem = ({ todo }: IProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.text);
  const [newDate, setNewDate] = useState(todo.createAt);
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      }
    });
  }, []);

  // todo 삭제
  const removeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97753',
      cancelButtonColor: '#909090',
      cancelButtonText: '취소',
      confirmButtonText: '삭제',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await firestore.collection(`${userUid}`).doc(`${todo.id}`).delete();
          Swal.fire({
            icon: 'success',
            title: '삭제되었습니다.',
            confirmButtonColor: '#15b887',
          });
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

  // 수정 모드 전환
  const onEditModeHandler = () => {
    setEditMode((prev) => !prev);
  };

  // todo 수정
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createNewTodo = {
      text: newTodo,
      createAt: newDate.replace(/\./g, '').replace(/\s/g, '-'),
    };
    try {
      await firestore
        .collection(`${userUid}`)
        .doc(`${todo.id}`)
        .update(createNewTodo);
      setEditMode(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '수정에 실패했습니다.',
        text: 'err.message',
        confirmButtonColor: '#15b887',
      });
    }
  };

  const onEditTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

  const onEditDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewDate(e.target.value);
  };

  const onIsChekcedChangeHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    const changedIsChecked = {
      isChecked: !todo.isChecked,
    };
    try {
      await firestore
        .collection(`${userUid}`)
        .doc(`${todo.id}`)
        .update(changedIsChecked);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '체크 오류',
        text: 'err.message',
        confirmButtonColor: '#15b887',
      });
    }
  };

  return (
    <MainWrapper>
      {editMode ? (
        <TodoItemBox>
          <EditFormBox onSubmit={onSubmit}>
            <InputBox>
              <input
                type="text"
                value={newTodo}
                required
                placeholder="Edit your Todo."
                onChange={onEditTextHandler}
                className="text-input"
              />
              <input
                type="date"
                value={newDate}
                onChange={onEditDateHandler}
                className="date-input"
              />
            </InputBox>
            <ControlBtnBox>
              <button className="green">확인</button>
              <button onClick={onEditModeHandler} className="red">
                취소
              </button>
            </ControlBtnBox>
          </EditFormBox>
        </TodoItemBox>
      ) : (
        <TodoItemBox>
          <TodoCheckBox onClick={onIsChekcedChangeHandler}>
            {todo.isChecked ? (
              <FontAwesomeIcon icon={faCircleCheck} className="icon" />
            ) : (
              <FontAwesomeIcon icon={faCircle} className="icon" />
            )}
            <TodoText>
              <Text className={todo.isChecked ? 'complete' : 'pending'}>
                {todo.text}
              </Text>
              <Date>{todo.createAt}</Date>
            </TodoText>
          </TodoCheckBox>
          <ControlBtnBox>
            <button className="green" onClick={onEditModeHandler}>
              수정
            </button>
            <button className="red" onClick={removeHandler}>
              삭제
            </button>
          </ControlBtnBox>
        </TodoItemBox>
      )}
    </MainWrapper>
  );
};

export default TodoItem;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TodoItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 60px;
  margin: 5px 0;
  border-radius: 10px;
  border: 1px solid #b0b0b0;
`;

const TodoCheckBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  :hover {
    cursor: pointer;
  }
  .icon {
    font-size: 25px;
    color: #15b887;
    margin-left: 20px;
  }
`;

const TodoText = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  .complete {
    color: #848484;
    text-decoration: line-through;
  }
  .pending {
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
`;

// 고쳐야할 부분
const Date = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 20%;
  align-items: flex-end;
  font-size: 17px;
`;

const ControlBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  button {
    font-size: 15px;
    width: 40px;
    height: 20px;
    border: none;
    background-color: #fff;
  }
  button.red {
    :hover {
      cursor: pointer;
      color: #f54100;
    }
  }
  button.green {
    :hover {
      cursor: pointer;
      color: #15b887;
    }
  }
`;

const EditFormBox = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  margin: 5px 0;
  border-radius: 10px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 90%;
  input.text-input {
    display: flex;
    align-items: center;
    font-size: 18px;
    width: 70%;
    padding: 0 30px 0 70px;
    border: none;
    outline: none;
    color: #848484;
  }
  input.date-input {
    font-size: 16px;
    display: flex;
    align-items: flex-end;
    font-size: 18px;
    width: 25%;
    border: none;
    outline: none;
    color: #848484;
  }
`;
