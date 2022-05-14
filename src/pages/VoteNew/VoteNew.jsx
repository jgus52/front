import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "./VoteNew.scss";

import "react-datepicker/dist/react-datepicker.css";
import img from "../../img/1619702385.jpg";
import profileAdd from "../../img/profile_add.svg";

const VoteNew = () => {
  const [electionName, setElectionName] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startTime, endTime] = dateRange;
  const [total, setTotal] = useState(0);
  const [quorum, setQuorum] = useState(0);
  const [electionInfo, setElectionInfo] = useState("");
  const [candidates, setCandidates] = useState([
    {
      number: 1,
      candidateName: "이재원",
      profile: img,
      promise:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nIn tincidunt est nunc. Cras eu bibendum odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum et risus scelerisque, mattis erat a, hendrerit mauris. Nulla facilisi. Praesent lobortis nisl et metus sollicitudin laoreet. Curabitur at elit viverra, semper enim et, efficitur lacus. Praesent at ipsum velit. Praesent eu tellus arcu. Suspendisse tellus libero,maximus nec imperdiet vel, porttitor ac mi. Sed lacinia mi vel arcu pretium, sed sollicitudin leo volutpat. Proin sodales felis et arcu sodales, id blandit libero maximus. Vestibulum et turpis id arcu ornare malesuada et ut orci. Sed lacinia elit nec risus aliquet, porta dignissim magna consectetur. Pellentesque eu pulvinar tortor. Donec at vehicula sapien, vel auctor tortor.",
    },
  ]);

  let candidateContent = [];
  for (let i = 0; i < candidates.length; i++) {
    candidateContent.push(
      <>
        <div key={candidates[i].number} className="candidate-name">
          {candidates[i].candidateName}
          <button></button>
        </div>
        <img
          className="candidate-profile"
          src={candidates[i].profile}
          alt="프로필"
        ></img>
        <div>{candidates[i].promise}</div>
        <div className="space"></div>
      </>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/election/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createElectionDTO: {
          electionName: electionName,
          startTime: startTime,
          endTime: endTime,
          quorum: quorum,
          total: total,
          electionInfo: electionInfo,
        },
        candidates: candidates,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.token) {
          localStorage.setItem("wtw-token", response.token);
        }
      });
  };
  return (
    <>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="name-range">
            <div>
              <p className="form-title">투표명</p>
              <div className="border"></div>
              <input
                type="text"
                placeholder="투표 명을 입력해주세요."
                value={electionName}
                onChange={(event) => {
                  setElectionName(event.target.value);
                  console.log(startTime + endTime);
                }}
              ></input>
            </div>
            <div>
              <p className="form-title">투표 기간</p>
              <div className="border"></div>
              <DatePicker
                dateFormat="yyyy/MM/d"
                selectsRange={true}
                startDate={startTime}
                endDate={endTime}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
            </div>
          </div>
          <div>
            <p className="form-title">투표 정보</p>
            <div className="border"></div>
            <textarea
              className="electionInfo"
              value={electionInfo}
              onChange={(event) => {
                setElectionInfo(event.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <p className="form-title">후보 정보</p>
            <div className="border"></div>
            {candidateContent}
            <p>새로운 후보 추가하기</p>
            <img
              className="candidate-profile"
              src={profileAdd}
              alt="후보 추가하기"
            ></img>
            <div className="space"></div>
          </div>
          <div>
            <p className="form-title">유권자 수 및 정족수</p>
            <div className="border"></div>
            <div>
              <p className="id-password-desc">유권자 수</p>
              <input
                type="number"
                value={total}
                spellCheck={false}
                onChange={(event) => setTotal(event.target.value)}
              />
            </div>
            <div>
              <p className="id-password-desc">정족수</p>
              <input
                type="number"
                value={quorum}
                spellCheck={false}
                onChange={(event) => setQuorum(event.target.value)}
              />
            </div>
          </div>
          <div className="space2" />
          <div>
            <button type="submit">투표 개설 승인 요청</button>
          </div>
          <div className="space" />
        </form>
      </div>
    </>
  );
};

export default VoteNew;
