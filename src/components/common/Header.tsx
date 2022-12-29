import styled from "styled-components";
import { useLoginStore } from "../../store/store";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import TodoLogo from "../../assets/TodoLogo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginStore();

  // 로그아웃 핸들러
  const logoutHandler = () => {
    signOut(auth);
    setIsLogin(false);
    alert("로그아웃 되었습니다.");
    window.location.replace("/");
  };
  return (
    <MainWrapper>
      <HeaderContainer>
        <HeaderTitle src={TodoLogo} onClick={() => navigate("/")} />
        <LoginSection>
          {isLogin === true ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </LoginSection>
      </HeaderContainer>
    </MainWrapper>
  );
};

export default Header;

const MainWrapper = styled.header`
  display: flex;
  position: relative;
  position: sticky;
  z-index: 10000;
  width: 100%;
  border-bottom: 1px #d0d0d0 solid;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;

  background-color: var(--black-030);
`;

const HeaderTitle = styled.img`
  width: 140px;
  :hover {
    cursor: pointer;
  }
`;

const LoginSection = styled.div`
  position: absolute;
  right: 0;
  margin-right: 200px;
  button {
    font-size: 20px;
    background-color: #fff;
    border: none;
    :hover {
      cursor: pointer;
    }
  }
`;
