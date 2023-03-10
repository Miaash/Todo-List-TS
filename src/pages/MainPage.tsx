import styled from 'styled-components';
import React, { useNavigate } from 'react-router';
import Header from '../components/common/Header';

const MainPage = ({ isLogin }: { isLogin: boolean }) => {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <Header />
      <MainContents>
        <TextBox>
          {isLogin === true ? (
            <h1>ð ëì Todo-List íì¸íê¸° ð</h1>
          ) : (
            <h1>â¨ ëë§ì Todoë¥¼ ê¸°ë¡íì¸ì! â¨</h1>
          )}
        </TextBox>
        <ButtonBox>
          {isLogin === true ? (
            <button onClick={() => navigate('/usertodo')}>
              Go to My Todo-List
            </button>
          ) : (
            <button onClick={() => navigate('/login')}>Create a Todo!</button>
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
