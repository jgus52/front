import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../Button/Button"
import Button2 from "../Button/Button2"

import './Header.scss'

const Header = () => {
    return (
        <div className="header-component">
            <div className="header-title">
                <Button2 text="UOSVOTE"  link="/" color="#ffffff" size="28px"/>
            </div>
            <div className="header-menu">
                <Button2 text="로그인"  link="/login" color="#ffffff" size="28px"/>
                <Button text="회원가입"  link="/signup" color="#06287F" size="28px"/>
            </div>
        </div>
    )
}

export default Header