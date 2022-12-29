import styled from "styled-components";
import { useLoginStore } from "../store/store";
import { useNavigate } from "react-router";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

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
    <div>
      <div>헤더입니다.</div>
      <div>
        {isLogin === true ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
