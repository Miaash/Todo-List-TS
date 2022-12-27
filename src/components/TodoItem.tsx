import React from "react";
import { todoType } from "../types/todoType";

interface IProps {
  todo: todoType;
}

const TodoItem = ({ todo }: IProps) => {
  return <div>{todo.text}</div>;
};

export default TodoItem;
