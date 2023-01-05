import { useEffect, useState } from 'react';
// import { todos } from '../../firebase/firebaseController';
import { firestore } from '../../firebase/firebaseConfig';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { todoType } from '../../types/\btypes';
import TodoItem from './TodoItem';

const TodoView = ({ userUid }: { userUid: string }) => {
  const date = new Date().toLocaleDateString();
  const [todoItems, setTodoItems] = useState<todoType[]>([]);

  useEffect(() => {
    // onSnapshot메서드는 데이터에 crud이벤트가 감지 되었을 때 실행함.
    // 데이터의 변화를 실시간으로 알려주는 리스너
    // forEach방식보다 더 적게 리렌더링함.
    // 실시간으로 데이터가 변동된 사항을 보여줌
    onSnapshot(
      firestore.collection(`${userUid}`),
      (snapshot: QuerySnapshot<DocumentData>) => {
        setTodoItems(
          snapshot.docs &&
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
        );
      }
    );

    // const getUserTodo = async () => {
    //   const getTodo = await todos.where('creatorId', '==', userUid).get();

    //   onSnapshot(todos, (snapshot: QuerySnapshot<DocumentData>) => {
    //     setTodoItems(
    //       getTodo.docs.map((doc) => {
    //         return {
    //           ...doc.data(),
    //           id: doc.id,
    //         };
    //       })
    //     );
    //   });
    // };

    // getUserTodo();
  }, [todoItems]);

  return (
    <div>
      <h2> Todo List </h2>
      <h3>{date}</h3>
      {todoItems && todoItems.length ? (
        <div>
          {todoItems?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <h3>There is no Todo</h3>
      )}
    </div>
  );
};

export default TodoView;
