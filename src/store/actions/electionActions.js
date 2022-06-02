import { ELECTIONLIST_REQUEST, ELECTIONLIST_SUCCESS, ELECTIONLIST_FAIL, ELECTIONLIST_CHECK, ELECTIONLIST_CHECK_OUT } from "../constants/electionConstants"

export const electioninfo = () => async (dispatch) => {
    try {
      dispatch({ type: ELECTIONLIST_REQUEST })
  
      const config = {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          Accept: "application/json",
          authorization: 
          "Bearer " + localStorage.getItem("accessToken"),
        },
      }
  
      const res = await fetch(`https://uosvote.tk/election`, config)  
    
      if(res.status === 200) {
        dispatch({
          type: ELECTIONLIST_SUCCESS,
          data: await res.json(),
        });
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: ELECTIONLIST_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
}

export const electioncheck= () => (dispatch) => {
  dispatch({ type: ELECTIONLIST_CHECK })
}

export const electioncheckout= () => (dispatch) => {
  dispatch({ type: ELECTIONLIST_CHECK_OUT })
}