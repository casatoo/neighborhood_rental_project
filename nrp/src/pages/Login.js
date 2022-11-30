import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

/** 로그인 컴포넌트 */
function Login() {
  const [data, setData] = React.useState({});

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 로그인하기 = async () => {
    await axios({
      url: "http://localhost:4000/login",
      method: "POST",
      data: data,
    }).then((rep) => {
      if (rep.data.message) {
        alert(rep.data.message);
      }
      if (rep.data.code === "success") {
        window.location = "/";
      }
    });
  };
  return (
    <div className="login-box">
      <div className="input-box">
        <div className="login-box-Text">로그인</div>
        <div className="id-box-Text">아이디</div>
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요"
          onChange={데이터변경}
        />
        <div className="pw-box-Text">비밀번호</div>
        <input
          type="password"
          name="pw"
          placeholder="비밀번호를 입력해주세요"
          onChange={데이터변경}
        />
        <div className="btn-box">
          <a className="find-password-btn">비밀번호를 잊으셨나요?</a>
          <button className="login-btn" onClick={로그인하기}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
