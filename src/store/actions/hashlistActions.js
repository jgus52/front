import { MY_HASHLIST_REQUEST, MY_HASHLIST_SUCCESS, MY_HASHLIST_FAIL, ALL_HASHLIST_REQUEST, ALL_HASHLIST_SUCCESS, ALL_HASHLIST_FAIL } from "../constants/hashlistConstants"

export const myhash = () => async (dispatch) => {
    try {
      dispatch({ type: MY_HASHLIST_REQUEST })
  
      const config = {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          Accept: "application/json",
          authorization: 
          "Bearer " + localStorage.getItem("accessToken"),
        },
      }
  
      const res = await fetch(`https://uosvote.tk/election/myballot/13`, config)
      const myhash = await res.json();
    
      if(res.status === 200) {
        dispatch({
          type: MY_HASHLIST_SUCCESS,
          data: myhash
        });
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: MY_HASHLIST_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
  }

  export const allhash = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_HASHLIST_REQUEST })
  
      const config = {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          Accept: "application/json",
          authorization: 
          "Bearer " + localStorage.getItem("accessToken"),
        },
      }
  
      const res = await fetch(`https://uosvote.tk/election/ballot/13`, config)  
      const allhash = await res.json();
    
      if(res.status === 200) {
        dispatch({
          type: ALL_HASHLIST_SUCCESS,
          data: allhash
        });
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: ALL_HASHLIST_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
  }