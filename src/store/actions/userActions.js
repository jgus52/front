import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_ERROR_SUCCESS_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_CERTIFICATION_REQUEST, USER_CERTIFICATION_SUCCESS, USER_CERTIFICATION_FAIL, USER_SENDMAIL_REQUEST, USER_SENDMAIL_SUCCESS, USER_SENDMAIL_FAIL, USER_RESET_CERTIFICATION_NUMBER_CHECK, USER_LOGIN_CHECK } from "../constants/userConstants"

export const signup = (submittedUserData) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept: "application/json",
        },
        body:JSON.stringify(submittedUserData)
      }

      const res = await fetch(`https://uosvote.tk/auth/register`, config)

      if(res.status === 201) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          success: "회원가입에 성공하셨습니다. 축하드립니다."
        })
      } else if(res.status === 409){
        dispatch({
          type: USER_REGISTER_FAIL,
          error: "회원가입에 실패하였습니다. 입력한 내용을 다시 확인해주세요" 
        })
      } else {
        throw new Error()
      }

    } 
    catch (err) {
      dispatch({
          type: USER_REGISTER_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
}

export const usersendmail= (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_SENDMAIL_REQUEST })

    const config = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      body:JSON.stringify({email})
    }

    const res = await fetch(`https://uosvote.tk/auth/sendmail`, config)
    const data = await res.json();

    if(res.status === 201) {
      dispatch({
        type: USER_SENDMAIL_SUCCESS,
        success: "인증 번호가 전송되었습니다.",
        data: data.authNum
      })
    } else if(res.status === 409){
      dispatch({
        type: USER_SENDMAIL_FAIL,
        error: "인증 번호 전송에 실패했습니다." 
      })
    } else {
      throw new Error()
    }

  } catch (err) {
    dispatch({
        type: USER_SENDMAIL_FAIL,
        error: "에러가 발생했습니다. 다시 시도해주세요" 
      })
  }
}

export const usercertification = (submittednumber) => async (dispatch) => {
  try {
    dispatch({ type: USER_CERTIFICATION_REQUEST })

    const config = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: "application/json",
        
      },
      body:JSON.stringify(submittednumber)
    }

    const res = await fetch(`https://uosvote.tk/auth/certification`, config)

    if(res.status === 201) {
      dispatch({
        type: USER_CERTIFICATION_SUCCESS,
        success: "사용자 인증이 완료되었습니다"
      })
    } else if(res.status === 409){
      dispatch({
        type: USER_CERTIFICATION_FAIL,
        error: "사용자 인증이 실패하였습니다. 입력한 내용을 다시 확인해주세요" 
      })
    } else {
      throw new Error()
    }

  } catch (err) {
    dispatch({
        type: USER_CERTIFICATION_FAIL,
        error: "에러가 발생했습니다. 다시 시도해주세요" 
      })
  }
}

export const login = (submittedUserData) => async (dispatch) => {
  try {

    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      body:JSON.stringify(submittedUserData)
    }

    const res = await fetch(`https://uosvote.tk/auth/login`, config)
    const data = await res.json();

    if (data.accessToken !== null&&data.accessToken !== undefined) {
      localStorage.setItem("accessToken", data.accessToken);
    }


    if(res.status === 201) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
      })
    } else if (res.status === 404){
      dispatch({
        type: USER_LOGIN_FAIL,
        error: "존재하지 않는 사용자입니다." 
      })
    } else if (res.status === 401){
      dispatch({
        type: USER_LOGIN_FAIL,
        error: "비밀번호가 일치하지 않습니다. "
      })
    } else {
      throw new Error()
    }

  } catch (err) {
    dispatch({
        type: USER_LOGIN_FAIL,
        error: "에러가 발생했습니다. 다시 시도해주세요" 
      })
  }
}



export const resetErrorSuccess = () => (dispatch) => {
  dispatch({ type: USER_ERROR_SUCCESS_RESET })
}

export const resetcertificationNumberCheck = () => (dispatch) => {
  dispatch({ type: USER_RESET_CERTIFICATION_NUMBER_CHECK })
}

export const loginCheck = () => (dispatch) => {
  dispatch({ type: USER_LOGIN_CHECK })
}