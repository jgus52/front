import {
  MY_HASHLIST_REQUEST,
  MY_HASHLIST_SUCCESS,
  MY_HASHLIST_FAIL,
  ALL_HASHLIST_REQUEST,
  ALL_HASHLIST_SUCCESS,
  ALL_HASHLIST_FAIL,
} from "../constants/hashlistConstants";

export const myhash = (id) => async (dispatch) => {
  try {
    console.log("tlqkf");
    dispatch({ type: MY_HASHLIST_REQUEST });

    console.log("tlqkf2");
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };

    console.log("tlqkf3");

    const res = await fetch(
      `https://uosvote.tk/election/myballot/${id}`,
      config
    );
    console.log("tlqkf4" + res);
    var myhash = [];
    myhash = await res.json();

    if (res.status === 200) {
      console.log("inlist" + myhash.ballotHash);
      dispatch({
        type: MY_HASHLIST_SUCCESS,
        data: myhash,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("tlqkf6");
    dispatch({
      type: MY_HASHLIST_FAIL,
      error: "에러가 발생했습니다. 다시 시도해주세요",
    });
  }
};

export const allhash = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_HASHLIST_REQUEST });

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };

    const res = await fetch(`https://uosvote.tk/election/ballot/${id}`, config);
    const allhash = await res.json();

    if (res.status === 200) {
      dispatch({
        type: ALL_HASHLIST_SUCCESS,
        data: allhash,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    dispatch({
      type: ALL_HASHLIST_FAIL,
      error: "에러가 발생했습니다. 다시 시도해주세요",
    });
  }
};
