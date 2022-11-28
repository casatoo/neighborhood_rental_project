import React from "react";
import { StoreContext } from "../App";

/** 컴포넌트는 일반함수 처럼
 * 첫글자는 대문자
 */
function Main() {
  const { loginUser } = React.useContext(StoreContext);

  return <div>안녕하세요 {loginUser.nickname}님</div>;
}

export default Main;
