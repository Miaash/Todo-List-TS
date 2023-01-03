import React from 'react';
import { todoType } from '../../types/\btypes';
import { todos } from '../../firebase/firebaseController';
import { useDocId } from '../../store/store';

interface IProps {
  todo: todoType;
}

const TodoItem = ({ todo }: IProps) => {
  const { docId } = useDocId();
  const removeHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const confirmMsg = window.confirm('삭제하시겠습니까?');
    if (confirmMsg) {
      // 이렇게 하면 방금 추가한 todo의 doc id가 업데이트 되었기 때문에 방금 추가된 todo만 삭제할 수 있게 된다.
      // 내가 선택한 요소의 docId를 가져와야한다.
      await todos.doc(docId).delete();
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
