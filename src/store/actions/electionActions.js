import { ELECTIONLIST_REQUEST, ELECTIONLIST_SUCCESS, ELECTIONLIST_FAIL } from "../constants/electionConstants"

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
  
      const res = await fetch(`http://13.125.78.245:3001/election`, config)  
      const list = await res.json()

      var contact = JSON.stringify(list); 
      const {electionlist}  = JSON.parse(contact); 
      console.log(electionlist);
  
      if(res.status === 200) {
        dispatch({
          type: ELECTIONLIST_SUCCESS,
          payload:{ electionlist },
        });
        console.log("lalal"+res);
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