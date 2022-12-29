import { useEffect, useState } from "react";
import { todos } from "../../firebase/firebaseController";
import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { todoType } from "../../types/\btypes";
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
      <h3> Todo List </h3>
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
