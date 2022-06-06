import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Moment from "moment";
import { loginCheck } from "../../store/actions/userActions";
import {
  myelectioninfo,
  electioncheck,
} from "../../store/actions/electionActions";

import Modal3 from "../../components/Modal/Modal3";

import "./Vote.scss";

function Vote() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState(-1);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [agree, setAgree] = useState(false);

  const { isLogin } = useSelector((state) => state.user);
  const { myelectionloading, myelection, iselection } = useSelector(
    (state) => state.election
  );
  let candidateContent = [];

  const openModal3 = () => {
    setModal3Visible(true);
  };
  const closeModal3 = () => {
    setModal3Visible(false);
  };

  if (!isLogin) {
    if (localStorage.getItem("accessToken") !== null) {
      dispatch(loginCheck());
    }
  }

  if (!iselection) {
    dispatch(electioncheck());
  }

  useEffect(() => {
    if (!myelectionloading) {
      dispatch(myelectioninfo(id));
    }
  }, []);

  const handleModal3Click = () => {
    console.log("modal3");
    setAgree(true);
  };

  if (typeof myelection.id != "undefined") {
    for (let i = 0; i < myelection.candidates.length; i++) {
      let selFlag = i == selected;
      candidateContent.push(
        <div
          className="candidate-info"
          key={myelection.candidates[i].candidateNumber}
        >
          <div className="candidate-name">
            {myelection.candidates[i].candidateNumber +
              ". " +
              myelection.candidates[i].candidateName}
          </div>
          <div className="candidate-center">
            <img
              className="candidate-profile"
              src={myelection.candidates[i].profile}
              alt="프로필"
            ></img>
            <button
              className={
                selFlag ? "candidate-submit-selected" : "candidate-submit"
              }
              onClick={(event) => {
                event.preventDefault();
                if (selFlag) {
                  setSelected(-1);
                } else {
                  setSelected(i);
                }
              }}
            >
              {selFlag ? "선택 됨" : "선택하기"}
            </button>
          </div>
        </div>
      );
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    fetch("https://uosvote.tk/election/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        selected: selected,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
    history.goBack();
    console.log("lala");
  };

  return (
    <>
      {modal3Visible && (
        <Modal3 onClose={closeModal3} onClick={handleModal3Click}></Modal3>
      )}
      <div className="vote">
        {(typeof myelection.id == "undefined" || myelection.id != id) && (
          <div className="election-list-none">
            <p>해당 정보를 블록체인에서 불러오고 있습니다.</p>
          </div>
        )}

        {myelection.id == id && (
          <>
            <div className="name-range">
              <div className="name">
                <div className="title">투표 명</div>
                <div className="border"></div>
                <div className="info"> {myelection.name} </div>
              </div>
              <div className="range">
                <div className="title">기간 </div>
                <div className="border"></div>
                <div className="info">
                  {Moment(myelection.startDate).format("yyyy/MM/DD h:mm a")} ~
                  {Moment(myelection.endDate).format("yyyy/MM/DD h:mm a")}
                </div>
              </div>
            </div>
            <div className="title">후보 정보</div>
            <div className="border"></div>
            <div className="info2">{candidateContent}</div>
            <form className="center" onSubmit={handlesubmit}>
              <div className="space2"></div>
              <div>
                <input
                  type="checkbox"
                  required
                  checked={agree}
                  onClick={(event) => {
                    setAgree(!agree);
                  }}
                ></input>
                <a
                  className="submit-agree"
                  onClick={(event) => {
                    event.preventDefault();
                    openModal3();
                  }}
                >
                  관련 사항을 확인 했으며 동의 합니다.
                </a>
              </div>
              <button
                className={
                  selected > -1 ? "button-submit" : "button-submit-unactive"
                }
                type="submit"
                disabled={selected == -1}
              >
                {selected > -1 ? "결과 제출하기" : "후보를 선택해 주세요"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
export default Vote;