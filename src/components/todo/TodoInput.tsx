import React, { useState } from 'react';
import { apiKey } from '../../firebase/firebaseConfig';
import { todos } from '../../firebase/firebaseController';

const TodoInput = () => {
  const [text, setText] = useState('');
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isToken = sessionStorage.getItem(_session_key);
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
      id: isToken,
    };
    await todos.add(createTodo);
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            type="text"
            placeholder="텍스트를 입력하세요"
            onChange={textChangeHandler}
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