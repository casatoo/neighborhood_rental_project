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
    <div className="main-body-box">
    <div className="main-img-box">
      <img className="main-img" src={`${process.env.PUBLIC_URL}/main.png`} alt="" />
    </div>
    <div class="icon-boxes">
      <div class="icon-box">
        <img class="icon" src="https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1663728912532_500.png" alt=""/>
        <div>0원 랜탈</div>
      </div>
        <div class="icon-box">
        <img class="icon" src="https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1662536671768_100.png" alt=""/>
        <div>브랜드</div>
      </div>
        <div class="icon-box">
        <img class="icon" src="https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1663728980875_100.png" alt=""/>
        <div>1일 대여</div>
      </div>
        <div class="icon-box">
        <img class="icon" src="	https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1663729004674_100.png" alt=""/>
        <div>간편 대여 견적</div>
      </div>
        <div class="icon-box">
        <img class="icon" src="https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1662536671600_100.png" alt=""/>
        <div>렌탈AI</div>
      </div>
        <div class="icon-box">
        <img class="icon" src="https://contents.sixshop.com/thumbnails/uploadedFiles/16843/default/image_1663728946390_100.png" alt=""/>
        <div>사업자 전용</div>
      </div>
    </div>
    </div>
  );
}

export default Main;
