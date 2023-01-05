import React, { useState, useEffect } from 'react';
import { todoType } from '../../types/\btypes';
// import { todos } from '../../firebase/firebaseController';
import { firestore } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseConfig';

interface IProps {
  todo: todoType;
}

const TodoItem = ({ todo }: IProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.text);
  const [userUid, setUserUid] = useState<string>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      }
    });
  }, []);

  // todo 삭제
  const removeHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const confirmMsg = window.confirm('삭제하시겠습니까?');
    if (confirmMsg) {
      // todo.id를 doc경로로 지정해 삭제
      await firestore.collection(`${userUid}`).doc(`${todo.id}`).delete();
      alert('삭제되었습니다.');
    }
  };

  // 수정 모드 전환
  const onEditModeHandler = () => {
    setEditMode((prev) => !prev);
  };

  // todo 수정
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await firestore.collection(`${userUid}`).doc(`${todo.id}`).update({
      text: newTodo,
    });
    alert('수정되었습니다.');
    setEditMode(false);
  };
  const onEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newTodo}
              required
              placeholder="Edit your Todo."
              onChange={onEditHandler}
            />
            <button>confirm</button>
          </form>
          <button onClick={onEditModeHandler}>취소</button>
        </div>
      ) : (
        <div>
          <h3>{todo.text}</h3>
          <div>
            <button onClick={removeHandler}>삭제</button>
            <button onClick={onEditModeHandler}>수정</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
