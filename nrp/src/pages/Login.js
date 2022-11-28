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
    <div>
      <input
        type="text"
        name="id"
        placeholder="아이디를 입력해주세요"
        onChange={데이터변경}
      />
      <input
        type="password"
        name="pw"
        placeholder="비밀번호를 입력해주세요"
        onChange={데이터변경}
      />
      <button type="button" onClick={로그인하기}>
        로그인
      </button>
    </div>
  );
}
export default Login;
