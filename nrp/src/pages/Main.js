import React from "react";
import { StoreContext } from "../App";
import axios from "axios";

axios.defaults.withCredentials = true;

/** 컴포넌트는 일반함수 처럼
 * 첫글자는 대문자
 */

function Main() {
  const { loginUser } = React.useContext(StoreContext);

  console.log(loginUser);

  return <div>안녕하세요 {loginUser.name}님</div>;
}

export default Main;
