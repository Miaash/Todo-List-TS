import { orderBy } from 'firebase/firestore';
import React, { useState } from 'react';
// import { todos } from '../../firebase/firebaseController';
// import { useDocId } from '../../store/store';
import { firestore } from '../../firebase/firebaseConfig';

const TodoInput = ({ userUid }: { userUid: string }) => {
  const [text, setText] = useState('');
  // const { setDocId } = useDocId();
  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createTodo = {
      text: text,
      isChecked: false,
      createAt: new Date().toLocaleDateString(),
      creatorId: userUid,
    };
    // promise를 리턴함
    await firestore.collection(`${userUid}`).add(createTodo);
    // 추가될 때 날짜 순으로 정렬 => 작동 안 함
    orderBy('createAt', 'desc');
    setText('');
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter your Todo."
            onChange={textChangeHandler}
            value={text}
          />
        </div>
        <div>
          <button>확인</button>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
