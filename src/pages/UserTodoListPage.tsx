import styled from "styled-components";
import TodoContents from "../components/todo/TodoContents";

const UserTodoListPage = () => {
  return (
    <div>
      <div>유저의 투두리스트 입니다.</div>
      <TodoContents />
    </div>
  );
};

export default UserTodoListPage;
