import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { myhash } from "../../store/actions/hashlistActions";
import Moment from "moment";
import { loginCheck } from "../../store/actions/userActions";
import {
  myelectioninfo,
  electioncheck,
} from "../../store/actions/electionActions";

import "./Voteinfo.scss";

function Voteinfo() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.user);
  const { myelectionloading, myelection, iselection } = useSelector(
    (state) => state.election
  );
  const { myhashloading, myhashlist } = useSelector((state) => state.hashlist);
  let fullRange, nowRange;

  let candidateContent = [];

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
    if (!myhashloading) {
      dispatch(myhash(id));
    }
  }, []);
  console.log(myelection);

  if (typeof myelection.id != "undefined") {
    for (let i = 0; i < myelection.candidates.length; i++) {
      candidateContent.push(
        <div key={myelection.candidates[i].candidateNumber}>
          <div className="candidate-name">
            {myelection.candidates[i].candidateNumber +
              ". " +
              myelection.candidates[i].candidateName}
          </div>
          <img
            className="candidate-profile"
            src={myelection.candidates[i].profile}
            alt="프로필"
          ></img>
          <div className="candidate-promise">
            {myelection.candidates[i].promise}
          </div>
          <div className="space"></div>
        </div>
      );
      fullRange = new Date(myelection.endDate) - new Date(myelection.startDate);
      nowRange = new Date() - new Date(myelection.startDate);
    }
  }

  return (
    <div className="voteinfo">
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
          <div className="title">투표 정보</div>
          <div className="border"></div>
          <div className="info">{myelection.info}</div>
          <div className="title">후보 정보</div>
          <div className="border"></div>
          <div className="info">{candidateContent}</div>
          <div className="title">투표 현황</div>
          <div className="border"></div>
          <div className="center">
            <div className="center-row">
              <div className="center-title">투표 참여율</div>
            </div>
            <div className="center-row-inner">
              <div className="center-mark">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "50%",
                    width: 15,
                    height: 15,
                    backgroundColor: "#067F7F",
                  }}
                ></div>
                정족수({myelection.quorum}명)
              </div>
              <div className="center-info">
                {((myelection.now / myelection.total) * 100).toFixed(1)}%(
                {myelection.now}
                명/
                {myelection.total}명)
              </div>
            </div>
            <ProgressBar
              width={800}
              percent={(myelection.now / myelection.total) * 100}
              stepPositions={[(myelection.quorum / myelection.total) * 100]}
              filledBackground="linear-gradient(to right, #06287f, #06287f)"
              unfilledBackground="#8393bf"
            >
              <Step transition="scale">
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : ""
                    }`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      width: 15,
                      height: 15,
                      backgroundColor: "#067F7F",
                    }}
                  ></div>
                )}
              </Step>
            </ProgressBar>
            <div className="center-row">
              <div className="center-title">남은 투표 기간</div>
            </div>
            <div className="center-row-inner">
              <div className="center-mark"></div>
              <div className="center-info">
                {((nowRange / fullRange) * 100).toFixed(1)}%
              </div>
            </div>
            <ProgressBar
              width={800}
              percent={(nowRange / fullRange) * 100}
              filledBackground="linear-gradient(to right, #06287f, #06287f)"
              unfilledBackground="#8393bf"
            ></ProgressBar>
            <div className="space2"></div>
            <Link
              to={
                typeof myhashlist.ballotHash == "undefined"
                  ? `/vote/${id}`
                  : `/voteverification/${id}`
              }
              className="button-submit"
              style={{ textDecoration: "none" }}
              type="submit"
            >
              {typeof myhashlist.ballotHash == "undefined"
                ? "투표 참여하기"
                : "투표 해쉬 정보 확인하기"}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
export default Voteinfo;
