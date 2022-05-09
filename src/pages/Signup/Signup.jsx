import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Block from '../../components/Block/Block'
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { checkEmailValidation, checkPasswordValidation, checkStudentIDValidation } from '../../utils/authUtils'
import { signup, resetErrorSuccess } from "../../store/actions/userActions";
import './Signup.scss'

const Signup = ({history}) => {

    const [username, setUsername] = useState('')
    const [studentID, setStudentID] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [formError, setFormError] = useState('')
    const [modalOpen, setModalOpen] = useState('close')

    const { loading, success, error, } = useSelector(state=>state.user)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setModalOpen('open')
        if(!checkEmailValidation(email)) {
            setFormError("올바른 이메일 형식이 아닙니다")
            return
        }
        if(!checkStudentIDValidation(username)) {
            setFormError("올바른 학번 형식이 아닙니다")
            return
        }
        if(!checkPasswordValidation(password)){
          setFormError("비밀번호는 숫자, 영어, 특수문자를. 포함하며 8자 이상이어야 합니다")
          return
        }
        if(password !== confirmPassword) {
          setFormError("비밀번호와 비밀번호 확인값이. 일치하지 않습니다")
          return
        }
    
        const submittedUserData = {
            studentName: username,
            studentID: studentID,
            email: email,
            password,
        }
    
        dispatch(signup(submittedUserData))
    }

    const handleModalClick = () => {
        if(success === '회원가입이 완료되었습니다') {
            dispatch(resetErrorSuccess())
            history.push('/')
            return
        } 

        setModalOpen(prevState => 'close')
        dispatch(resetErrorSuccess())
        setTimeout(() => {
        setFormError(prevState => '')  
        }, 500);
    }

    return (
        <>
            {!loading &&
            <Modal
                modalOpen={modalOpen}
                buttonText="확인"
                buttonSize="16px"
                onClick={handleModalClick}
                >
                {success && success.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                {error && error.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
                {formError && formError.split(".").map((msg, idx) => <p key={idx}>{msg}</p>)}
            </Modal>
            }

            <div className="signup-container">
                <Block>
                    <form onSubmit={handleSubmit}>
                        <p className="signup-desc">회원가입</p>

                        <div className="signup-name-container">
                            <p className="id-password-desc">이름</p>
                            <input 
                                type="text"
                                value={username}
                                spellCheck={false}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div>

                        <div className="signup-studentID-container">
                            <p className="id-password-desc">학번</p>
                            <input
                                type="text"
                                value={studentID}
                                spellCheck={false}
                                onChange={(e)=>setStudentID(e.target.value)}
                            />
                        </div>

                        <p className="id-password-desc">학교 이메일</p>
                        <div className="signup-email-container">
                            <input 
                                type="text"
                                value={email}
                                spellCheck={false}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Button text="인증 번호 전송" size="16px" color="#ffffff"/>
                        </div>

                        <p className="id-password-desc">인증번호</p>
                        <div className="signup-CertificationNumber-container">
                            <input/>
                            <Button text="확인" size="16px" color="#ffffff"/>
                            <Button text="재전송" size="16px" color="#ffffff"/>
                        </div>

                        <div className="signup-password-container">
                            <p className="id-password-desc">비밀번호</p>
                            <input 
                                placeholder="숫자, 영어, 특수문자를 포함한 8자 이상" 
                                type="password" 
                                value={password}
                                spellCheck={false}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className="signup-checkpassword-container">
                            <p className="id-password-desc">비밀번호 확인</p>
                            <input 
                                type="password"
                                value={confirmPassword}
                                spellCheck={false}
                                onChange={(e)=>setconfirmPassword(e.target.value)}
                            />
                        </div>
                
                        <div className="signup-button">
                            <Button 
                                type={(modalOpen==="open" || formError)? "" : "submit"}
                                text="가입하기" 
                                size="18px" 
                                color="#ffffff"/>
                        </div>
                    </form>
                </Block>
            </div>
        </>
    )
}

export default Signup