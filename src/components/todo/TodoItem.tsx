import React from 'react';
import { todoType } from '../../types/\btypes';
import { todos } from '../../firebase/firebaseController';

interface IProps {
  todo: todoType;
}

const TodoItem = ({ todo }: IProps) => {
  // const DocId =
  const removeHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const confirmMsg = window.confirm('삭제하시겠습니까?');
    if (confirmMsg) {
      await todos.doc('0jMr5kRGti98CEJXSd1K').delete();
      alert('삭제되었습니다.');
    }
  };
  return (
    <div>
      <div>{todo.text}</div>
      <div>
        <button onClick={removeHandler}>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
