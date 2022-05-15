import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_ERROR_SUCCESS_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_CERTIFICATION_REQUEST, USER_CERTIFICATION_SUCCESS, USER_CERTIFICATION_FAIL, USER_SENDMAIL_REQUEST, USER_SENDMAIL_SUCCESS, USER_SENDMAIL_FAIL, USER_RESET_CERTIFICATION_NUMBER_CHECK } from "../constants/userConstants"

const initialState = {
    loading: false,
    success: null,
    error: null,
    isLogin: false,
    isUsercertification: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        case USER_SENDMAIL_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_SENDMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null,
            }
        case USER_SENDMAIL_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        case USER_CERTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_CERTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null,
                isUsercertification: true
            }
        case USER_CERTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        case USER_ERROR_SUCCESS_RESET:
            return {
                ...state,
                success: null,
                error: null
            }
        case USER_RESET_CERTIFICATION_NUMBER_CHECK:
            return {
                ...state,
                isUsercertification: false
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                isLogin: true,
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        case USER_ERROR_SUCCESS_RESET:
            return {
                ...state,
                success: null,
                error: null
            }
        default:
            return state
    }
}

export default userReducer