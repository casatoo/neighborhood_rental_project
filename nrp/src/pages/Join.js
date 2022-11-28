import axios from "axios";
import React from "react";
/** 네비게이션 사용 */
import { useNavigate } from "react-router-dom";

/** 쿠키정보 공유 */
axios.defaults.withCredentials = true;

/** 회원가입 컴포넌트
 */
function Join() {
  const [data, setData] = React.useState({});

  const navigation = useNavigate();

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
    console.log(data);
  };

  const 가입하기 = async () => {
    await axios({
      url: "http://localhost:4000/join",
      method: "POST",
      data: data,
    }).then((rep) => {
      if (rep.data.message) {
        alert(rep.data.message);
      }
      if (rep.data.code === "success") {
        navigation("/login");
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
      <input
        type="text"
        name="name"
        placeholder="이름을 입력해주세요"
        onChange={데이터변경}
      />
      <input
        type="text"
        name="location"
        placeholder="주소를 입력해주세요"
        onChange={데이터변경}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="전화번호를 입력해주세요"
        onChange={데이터변경}
      />
      <input
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={데이터변경}
      />

      <button type="button" onClick={가입하기}>
        가입
      </button>
    </div>
  );
}

export default Join;
