import styled from "styled-components";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { useLoginStore } from "../store/store";

const MainPage = () => {
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      {isLogin === true ? (
        <button onClick={() => navigate("/usertodo")}>Create a Todo!</button>
      ) : (
        <button onClick={() => navigate("/login")}>Create a Todo!</button>
      )}
    </div>
  );
};

export default MainPage;
