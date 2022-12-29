import styled from "styled-components";
import { useNavigate } from "react-router";
import Header from "../components/common/Header";
import { useLoginStore } from "../store/store";

const MainPage = () => {
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();
  return (
    <MainWrapper>
      <Header />
      <MainContents>
        <TextBox>
          {isLogin === true ? (
            <h1>😉 나의 Todo-List 확인하기 😚</h1>
          ) : (
            <h1>✨ 나만의 Todo를 기록하세요! ✨</h1>
          )}
        </TextBox>
        <ButtonBox>
          {isLogin === true ? (
            <button onClick={() => navigate("/usertodo")}>
              Go to My Todo-List
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Create a Todo!</button>
          )}
        </ButtonBox>
      </MainContents>
    </MainWrapper>
  );
};

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const MainContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px 50px;
  width: 100%;
  height: 100%;
`;

const TextBox = styled.div``;

const ButtonBox = styled.div`
  margin-top: 30px;
  button {
    width: 300px;
    height: 80px;
    font-size: 30px;
    border: none;
    border-radius: 10px;
    background-color: #15b887;
    color: #fff;
  }
  button:hover {
    cursor: pointer;
    background-color: #13a478;
  }
`;
