import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Block from '../../components/Block/Block'
import Button from "../../components/Button/Button";
import * as bcrypt from 'bcryptjs';
import Modal from "../../components/Modal/Modal";
import { login, resetErrorSuccess } from "../../store/actions/userActions";
import { checkEmailValidation, checkPasswordValidation } from "../../utils/authUtils";

import './Login.scss'

const Login = ({history}) => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [hashpassword, sethashpassword] = useState('')
    const [modalOpen, setModalOpen] = useState('')
    const [formError, setFormError] = useState('')

    const dispatch = useDispatch()
    const { loading, success, error } = useSelector(state=>state.user)

    const makeHash = async (password) => {
        sethashpassword(await bcrypt.hash(password, 10))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        makeHash(password);
        console.log(hashpassword);

        setModalOpen('open')

        let submittedUserData

        if(!checkEmailValidation(email)) {
            setFormError("올바른 이메일 형식이 아닙니다")
            return
        }

        if(!password) {
            setFormError("비밀번호를 입력하지 않으셨습니다")
            return
        }

        if(!checkPasswordValidation(password)){
            setFormError("비밀번호는 숫자, 영어, 특수문자를. 포함하며 8자 이상이어야 합니다")
            return
        }

        submittedUserData = {
            studentName: email,
            enrollSecret:hashpassword,
        }

        dispatch(login(submittedUserData))
    }

    const handleModalClick = () => {
        setModalOpen(prevState => 'close')
        dispatch(resetErrorSuccess())
        setTimeout(() => {
        setFormError(prevState => '')  
        }, 500);
    }

    useEffect(() => {
        if(success) {
          dispatch(resetErrorSuccess())
          history.push('/')
        } 
      },[success, history])

    return (
        <>
            {!loading && 
                <Modal
                    modalOpen={modalOpen}
                    buttonText="확인"
                    buttonSize="16px"
                    onClick={handleModalClick}
                    >
                    {error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                    {formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                </Modal>
            }
            <div className="login-container">
                <Block>
                    <form onSubmit={handleSubmit}>
                        <p className="login-desc">로그인</p>
                        <div className="login-id-container">
                            <p className="id-password-desc">학교 이메일</p>
                            <input 
                                placeholder="@uos.ac.kr"
                                type="text"
                                value={email}
                                spellCheck={false}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-password-container">
                            <p className="id-password-desc">패스워드</p>
                            <input 
                                type="password"
                                value={password}
                                spellCheck={false}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login-button">
                            <Button
                                type={(modalOpen==="open" || formError)? "" : "submit"} 
                                text="로그인" 
                                size="18px" 
                                color="#ffffff"
                            />
                        </div>
                        <div className="login-needsignup-container">아직 회원가입을 안 했다면? 
                            <Button text="회원가입 하러가기" link="/signup" size="16px" color="#000000"/>
                        </div>
                    </form>
                </Block>
            </div>
        </>
        
    )
}

export default Login 