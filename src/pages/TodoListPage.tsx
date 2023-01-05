import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/common/Header';
import firebase from 'firebase/compat/app';
import TodoView from '../components/todo/TodoView';
import TodoInput from '../components/todo/TodoInput';

const TodoListPage = ({ userUid }: { userUid: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <TodoView userUid={userUid} />
      <TodoInput userUid={userUid} />
    </div>
  );
};

export default TodoListPage;
