import styled from "styled-components";
import TodoContents from "../components/todo/TodoContents";
import Header from "../components/common/Header";

const UserTodoListPage = () => {
  return (
    <div>
      <Header />
      <h2>유저의 투두리스트 입니다.</h2>
      <TodoContents />
    </div>
  );
};

export default UserTodoListPage;
