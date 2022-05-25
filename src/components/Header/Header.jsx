import React from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import Button2 from "../Button/Button2";

import "./Header.scss";

const Header = () => {

  const { isLogin } = useSelector(state=>state.user)

  return (
    <div className="header-component">
      <div className="header-title">
        <Button2 text="UOSVOTE" link="/" color="#ffffff" size="24px" />
      </div>
      <div className="header-menu">
        {!isLogin&&<Button2 text="로그인" link="/login" color="#ffffff" size="20px" />}
        {!isLogin&&<Button text="회원가입" link="/signup" color="#06287F" size="20px" />}
        {isLogin&&<Button text="투표 개설" link="/votenew" color="#06287F" size="20px" />}
      </div>
    </div>
  );
};

export default Header;
