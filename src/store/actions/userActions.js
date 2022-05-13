import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_ERROR_SUCCESS_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, } from "../constants/userConstants"

export const signup = (submittedUserData) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(submittedUserData)
      }

      const res = await fetch(`auth/signup`, config)

      if(res.status === 200) {
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

export const login = (submittedUserData) => async (dispatch) => {
  try {

    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(submittedUserData)
    }

    const res = await fetch(`auth/login`, config)

    if(res.status === 200) {
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

