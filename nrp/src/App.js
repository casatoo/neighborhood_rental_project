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

/**폰트어썸 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

/**  다른 포트로 쿠키 공유 */
axios.defaults.withCredentials = true;

/** 전역변수 생성 */
export const StoreContext = React.createContext({});

function Header() {
  return (
    <header className="header-bar">
      <div className="menu-tap">
        <div>
          <div>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </div>
      <a href="http://localhost:3000">
        <div className="main-icon">SHARE ONE</div>
      </a>
      <div className="user-nav">
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div>
          <a href="http://localhost:3000/login">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </div>
      </div>
    </header>
  );
}

function SideBar() {
  return (
    <div className="side-bar-bg">
      <div className="side-bar">
        <div className="side-bar-nav">
          <div className="side-bar-nav-top">
            <div className="main-icon">SHARE ONE</div>
            <a href="http://localhost:3000/login">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>
          <div className="side-bar-nav-search">
            <input type="text" />
          </div>
          <div className="side-bar-nav-article">
            <div>
              <a href="http://localhost:3000/article/notice">공지사항</a>
            </div>
            <div>
              <a href="http://localhost:3000/article/free">자유 게시판</a>
            </div>
            <div>
              <a href="http://localhost:3000/article/rental1">빌려줄게요</a>
            </div>
            <div>
              <a href="http://localhost:3000/article/rental2">빌려주세요</a>
            </div>
            <div>
              <a href="http://localhost:3000/article/review">후기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <Header />
      <SideBar />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
