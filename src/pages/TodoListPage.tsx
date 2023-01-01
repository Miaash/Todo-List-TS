import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/common/Header';
import firebase from 'firebase/compat/app';
import TodoView from '../components/todo/TodoView';
import TodoInput from '../components/todo/TodoInput';

const TodoListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      } else {
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <h2>유저의 투두리스트 입니다.</h2>
      <TodoView />
      <TodoInput />
    </div>
  );
};

export default TodoListPage;
