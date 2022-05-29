import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { loginCheck } from "../../store/actions/userActions";
import Moment from "moment";
import { electioninfo } from "../../store/actions/electionActions";

import "./Voteinfo.scss";

function Voteinfo() {
  const { id } = useParams();

  const dispatch = useDispatch();

  // const { isLogin } = useSelector(state=>state.user)
  const { electionloading, electionlist } = useSelector(
    (state) => state.election
  );

  // if (!isLogin){
  //     if(localStorage.getItem("accessToken")!==null){
  //         dispatch(loginCheck())
  //     }
  // }

  const length = electionlist.length;
  console.log(length);
  let candidateContent = [];
  console.log(electionlist[length - id]);
  for (let i = 0; i < electionlist[length - id].candidates.length; i++) {
    candidateContent.push(
      <div key={electionlist[length - id].candidates[i].candidateNumber}>
        <div className="candidate-name">
          {electionlist[length - id].candidates[i].candidateNumber + ". " + electionlist[length - id].candidates[i].candidateName}
        </div>
        <img
          className="candidate-profile"
          src={electionlist[length - id].candidates[i].profile}
          alt="프로필"
        ></img>
        <div>{electionlist[length - id].candidates[i].promise}</div>
        <div className="space"></div>
      </div>
    );
  }
  useEffect(() => {
    if (!electionloading) {
      dispatch(electioninfo());
    }
  }, []);



  return (
    <div className="voteinfo">
      <div className="name-range">
        <div className="name">
          <div className="title">투표 명</div>
          <div className="border"></div>
          <div className="info"> {electionlist[length - id].name} </div>
        </div>
        <div className="range">
          <div className="title">기간 </div>
          <div className="border"></div>
          <div className="info">
            {Moment(electionlist[length - id].startDate).format("yyyy.MM.d")} ~
            {Moment(electionlist[length - id].endDate).format("yyyy.MM.d")}
          </div>
        </div>
      </div>
      <div className="title">투표 정보</div>
      <div className="border"></div>
      <div className="info">{electionlist[length - id].info}</div>
      <div className="title">후보 정보</div>
      <div className="border"></div>
      <div className="info">{candidateContent}</div>
      <div className="title">투표 현황</div>
      <div className="border"></div>
      <div className="center"></div>
    </div>
  );
}
export default Voteinfo;
