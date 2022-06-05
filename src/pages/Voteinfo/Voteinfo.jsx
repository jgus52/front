import React, { useEffect, useState } from "react";
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
  const [canVote, setCanVote] = useState("before"); // before : 이전, now : 가능, after : 투표 이후
  const [result, setResult] = useState([]);
  let fullRange, nowRange;

  let candidateContent = [];
  let voteResultContent = [];

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
  useEffect(() => {
    fullRange = new Date(myelection.endDate) - new Date(myelection.startDate);
    nowRange = new Date() - new Date(myelection.startDate);
    console.log("now " + nowRange);
    console.log(fullRange < nowRange);
    if (nowRange < 0) {
      setCanVote("before");
    } else if (fullRange < nowRange) {
      setCanVote("after");
    } else {
      setCanVote("now");
    }
  }, [myelection]);

  useEffect(() => {
    console.log(canVote);
    if (canVote == "after") {
      try {
        fetch("https://uosvote.tk/election/electionResult/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setResult(response);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [canVote]);
  /*
  useEffect(() => {
    console.log("result");
    for (let i = 0; i < result.length; i++) {
      voteResultContent.push(
        <div key={i}>
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
          <div className="candidate-promise">{Math.round(result[i])}</div>
          <div className="space"></div>
        </div>
      );
    }
  }, [result]);
*/
  console.log(myelection);

  if (typeof myelection.id != "undefined" && myelection.id == id) {
    fullRange = new Date(myelection.endDate) - new Date(myelection.startDate);
    nowRange = new Date() - new Date(myelection.startDate);
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
    }
    if (canVote == "after") {
      let top = 0;
      let color;
      for (let i = 0; i < result.length; i++) {
        console.log((Math.round(result[i]) / myelection.total) * 100);
        color = "#06287f";
        if (top <= Math.round(result[i])) {
          top = Math.round(result[i]);
          color = "#D50000";
        }
        voteResultContent.push(
          <div key={i} className="center">
            <div className="center-row">
              <div className="center-title">
                {myelection.candidates[i].candidateNumber +
                  ". " +
                  myelection.candidates[i].candidateName}
              </div>
            </div>
            <div className="center-row-inner">
              <div className="center-mark"></div>
              <div className="center-info">
                {((Math.round(result[i]) / myelection.total) * 100).toFixed(1)}
                %( {Math.round(result[i])}
                명/
                {myelection.total}명)
              </div>
            </div>
            <ProgressBar
              width={800}
              percent={(Math.round(result[i]) / myelection.total) * 100}
              filledBackground={color}
              unfilledBackground="#8393bf"
            ></ProgressBar>
          </div>
        );
      }
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
              <div className="title">{canVote}</div>
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
          <div className="title">
            {canVote == "after" ? "투표 결과" : "투표 현황"}
          </div>
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
            {canVote == "now" && (
              <>
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
              </>
            )}
            {voteResultContent}
            <div className="space2"></div>
            {canVote == "before" && (
              <div className="button-submit-unactive">
                아직 투표를 참여할 수 없습니다.
              </div>
            )}
            {canVote == "after" && (
              <Link
                to={`/voteverification/${id}`}
                className="button-submit"
                style={{ textDecoration: "none" }}
                type="submit"
              >
                {"투표 해쉬 정보 확인하기"}
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Voteinfo;
