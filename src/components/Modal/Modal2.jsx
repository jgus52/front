import { useState } from "react";
import profileNormal from "../../img/profile_normal.svg";

import "./Modal2.scss";

const Modal2 = (props) => {
  const [candidateName, setCandidateName] = useState("");
  const [candidateInfo, setCandidateInfo] = useState("");
  const [imgBase64, setImgBase64] = useState(profileNormal); // 파일 base64

  const handleImgOnChange = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    }
  };
  const handleSubmit = (evnet) => {
    props.onClick(candidateName, imgBase64, candidateInfo);
    props.onClose();
  };

  return (
    <div
      className={"modal2-container"}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.onClose();
          console.log("container");
        }
      }}
    >
      <form className="modal2-inner" onSubmit={handleSubmit}>
        <p>후보자 이름</p>
        <div className="border" />
        <input
          required
          className="candi-name"
          type="text"
          placeholder="후보자 이름을 입력해 주세요."
          value={candidateName}
          onChange={(event) => {
            setCandidateName(event.target.value);
          }}
        ></input>
        <div className="space" />
        <p>후보자 사진</p>
        <div className="border" />
        <img
          className="profile-img"
          src={imgBase64}
          alt={"프로필 이미지"}
        ></img>
        <div>
          <input
            required
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            onChange={handleImgOnChange}
          />
        </div>
        <div className="space" />
        <p>후보자 정보</p>
        <div className="border" />
        <textarea
          required
          className="candidateInfo"
          value={candidateInfo}
          onChange={(event) => {
            setCandidateInfo(event.target.value);
          }}
        ></textarea>
        <div className="center">
          <button className="button-submit" type="submit">
            추가하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal2;
