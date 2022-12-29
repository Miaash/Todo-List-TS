import { useEffect, useState } from "react";
import { todos } from "../../firebase/firebaseController";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { todoType } from "../../types/todoType";
import TodoItem from "./TodoItem";

const TodoContents = () => {
  const [todoItems, setTodoItems] = useState<todoType[]>([]);

  useEffect(() => {
    onSnapshot(todos, (snapshot: QuerySnapshot<DocumentData>) => {
      setTodoItems(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div>
      <h1> Todo List </h1>
      {todoItems && todoItems.length ? (
        <div>
          {todoItems?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <h2>Todo가 없습니다.</h2>
      )}
    </div>
  );
};

export default TodoContents;
