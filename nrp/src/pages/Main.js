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

  return (
    <div class="main-img-box">
      <img className="main-img" src="https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1662535760275_2500.png" alt="" />
    </div>
  );
}

export default Main;
