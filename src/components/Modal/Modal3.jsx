import "./Modal3.scss";

const Modal3 = (props) => {
  const handleSubmit = (evnet) => {
    //todo 예외처리
    props.onClick();
    props.onClose();
  };

  return (
    <div
      className={"modal3-container"}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.onClose();
        }
      }}
    >
      <div className="modal3-inner">
        <p>
          아래 내용은 UOSVOTE를 이용하는데 필요한 기본적인 확인 사항및 구체적인
          사항을 안내하는 것입니다. <br></br>
          <br></br>1. 온라인투표서비스는 이용기관의 신청에 따라 선거관리위원회가
          제공하는 서비스로 해당 선거의 관리는 이용기관의 책임 하에
          이루어집니다. <br></br>2. 온라인투표서비스는 이용신청 후 이용협약 체결
          및 이용승인의 절차를 마치고 이용할 수 있습니다. <br></br>3. 다음의 각
          호에 해당하는 경우 UOSVOTE는 사용승인을 거절할 수 있습니다. <br></br>
          가. 기술상 서비스 제공이 불가능한 경우 <br></br>나. 실명이 아니거나,
          타인의 명의를 도용하여 허위로 신청하는 경우 <br></br>다. 등록사항을
          누락하거나 오기하여 신청하는 경우 <br></br>라. 악성 프로그램 및 버그를
          이용하거나 시스템 취약점을 악용하는 등 부정한 방법을 서비스에 사용한
          경우 <br></br>마. 서비스를 지원하는 대상에 해당하지 않는 경우{" "}
          <br></br>바. 기타 서비스 제공이 불가능하거나 사회적 민감성, 업무상황
          등을 고려하여 부적절하다고 판단한 경우 <br></br>4. 이용기관은 선거
          실시전 투표명, 투표 기간, 투표 정보, 후보 정보, 유권자 수, 정족수를
          작성하여야 하고, 관련 정보수집이나 잘못된 선거인 정보 등으로 인한
          책임은 이용기관에 있습니다. *선거인 개인정보 활용동의는 이용기관에서
          별도 확인 <br></br>5. 이용기관은 투표절차 및 그 결과의 정당한 효력
          발생을 위해 온라인투표서비스를 활용하는 것이 내부규정 등에 부합하는지
          여부를 직접 확인하여야 하고, 그 위반으로 인하여 발생하는 문제에
          대해서는 ‘UOSVOTE’가 책임지지 않습니다. <br></br>6. 이용기관은
          'UOSVOTE'가 완벽한 비밀 투표를 보장하지 않음을 인지하였으며, 관련
          정보로 인해 생기는 문제에 대해서는 'UOSVOTE'가 책임지지 않습니다.
        </p>
        <div className="center">
          <button className="button-submit" onClick={handleSubmit}>
            동의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal3;
