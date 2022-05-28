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

  let candidateContent = [];
  useEffect(() => {
    if (!electionloading) {
      dispatch(electioninfo());
    }
  }, []);

  const length = electionlist.length;
  console.log(length);
  const length2 = electionlist[length - id].candidates.length;
  console.log(length2);

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
    </div>
  );
}
export default Voteinfo;
