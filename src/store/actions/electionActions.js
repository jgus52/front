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
  
      const res = await fetch(`https://uosvote.tk/election`, config)  
      // const electionlist = await res.json()
      // console.log(electionlist);

      // var contact = JSON.stringify(list); 
      // console.log(contact);
  
      // var electionlist  = JSON.parse(contact); 
      // console.log(electionlist);
  
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