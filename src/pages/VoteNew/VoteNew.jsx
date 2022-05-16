import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "./VoteNew.scss";
import Modal2 from "../../components/Modal/Modal2";

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
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  let candidateContent = [];
  for (let i = 0; i < candidates.length; i++) {
    candidateContent.push(
      <div key={candidates[i].number}>
        <div className="candidate-name">
          {candidates[i].number + ". " + candidates[i].candidateName}
          <button></button>
        </div>
        <img
          className="candidate-profile"
          src={candidates[i].profile}
          alt="프로필"
        ></img>
        <div>{candidates[i].promise}</div>
        <div className="space"></div>
      </div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://13.125.21.192:3001/election/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYXJlNTAyQHVvcy5hYy5rciIsImlhdCI6MTY1MjY3NTA0OH0.PD4D6kzkOSNr3QErG5_T7Lui8HA0ItdToJaNdKFnToc",
      },
      body: JSON.stringify({
        createElectionDTO: {
          electionName: electionName,
          startTime: startTime,
          endTime: endTime,
          quorum: parseInt(quorum),
          total: parseInt(total),
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
  const handleModalClick = () => {};
  return (
    <>
      {modalVisible && (
        <Modal2 onClose={closeModal} onClick={handleModalClick}>
          {<div>lalala</div>}
        </Modal2>
      )}
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="name-range">
            <div className="name">
              <p className="form-title">투표명</p>
              <div className="border"></div>
              <input
                className="input-name"
                type="text"
                placeholder="투표 명을 입력해주세요."
                value={electionName}
                onChange={(event) => {
                  setElectionName(event.target.value);
                  console.log(startTime + endTime);
                }}
              ></input>
            </div>
            <div className="range">
              <p className="form-title">투표 기간</p>
              <div className="border"></div>
              <div className="right-margin">
                <DatePicker
                  className="datepicker"
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
          </div>
          <div>
            <p className="form-title">투표 정보</p>
            <div className="border"></div>
            <div className="content-margin">
              <textarea
                className="electionInfo"
                value={electionInfo}
                onChange={(event) => {
                  setElectionInfo(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div>
            <p className="form-title">후보 정보</p>
            <div className="border"></div>
            <div className="content-margin">
              {candidateContent}
              <p className="candidate-name">새로운 후보 추가하기</p>
              <img
                onClick={(event) => {
                  event.preventDefault();
                  openModal();
                  console.log("kaka" + modalVisible);
                }}
                className="candidate-profile"
                src={profileAdd}
                alt="후보 추가하기"
              ></img>
            </div>

            <div className="space"></div>
          </div>
          <div>
            <p className="form-title">유권자 수 및 정족수</p>
            <div className="border"></div>
            <div className="content-margin">
              <div>
                <p className="id-password-desc">유권자 수</p>
                <input
                  className="input-number"
                  type="number"
                  value={total}
                  spellCheck={false}
                  onChange={(event) => setTotal(event.target.value)}
                />
              </div>
              <div>
                <p className="id-password-desc">정족수</p>
                <input
                  className="input-number"
                  type="number"
                  value={quorum}
                  spellCheck={false}
                  onChange={(event) => setQuorum(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="space2" />
          <div className="center">
            <div>
              <input type="checkbox"></input>
              <a className="submit-agree">
                관련 사항을 확인 했으며 동의 합니다.
              </a>
            </div>
            <button className="button-submit" type="submit">
              투표 개설 승인 요청
            </button>
          </div>
          <div className="space" />
        </form>
      </div>
    </>
  );
};

export default VoteNew;
