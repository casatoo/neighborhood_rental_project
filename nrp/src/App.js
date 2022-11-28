import "./App.css";
/** react-router-dom 사용 */
import { Route, Routes } from "react-router-dom";
/** axios 사용 */
import axios from "axios";
/** react 사용 */
import React from "react";

/** 페이지 */
import Main from "./pages/Main";
import Join from "./pages/Join";
import Login from "./pages/Login";

/**  다른 포트로 쿠키 공유 */
axios.defaults.withCredentials = true;

/** 전역변수 생성 */
export const StoreContext = React.createContext({});

function App() {
  /** 로그인 유저 usestate */
  const [loginUser, setLoginUser] = React.useState({});

  /** 자동 로그인 */
  const 자동로그인 = async () => {
    await axios({
      url: "http://localhost:4000/autoLogin",
      method: "POST",
    })
      .then((rep) => {
        setLoginUser(rep.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  /** useeffact 한번 실행 */
  React.useEffect(() => {
    자동로그인();
  }, []);

  return (
    /** 전역변수 설정 */
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;