import React from 'react';
import { Backdrop, ModalBox, CloseIconButton } from './ConsentModalView.styles';

type ConsentModalProps = {
  open: boolean;
  onClose: () => void;
};

const ConsentModalView: React.FC<ConsentModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h5 className='title'>카풀 서비스 개인정보 수집 및 이용 동의서</h5>
        <CloseIconButton onClick={onClose}>×</CloseIconButton>
        <p>
          본 동의서는 <strong>CBA Connect 카풀 서비스</strong> 이용과 관련하여 귀하의 개인정보를 수집·이용하기 위해 마련되었습니다. 귀하께서는 본 동의서를 자세히 읽고 내용을 충분히 이해하신 후, 동의 여부를 결정하여 주시기 바랍니다.
        </p>

        <h6>1. 개인정보의 수집·이용 목적</h6>
        <p>카풀 서비스 이용자 간 원활한 매칭과 서비스 제공, 사용자 관리 및 원활한 의사소통을 위해 수집합니다.</p>

        <h6>2. 수집하는 개인정보 항목</h6>
        <ul>
          <li><strong>필수 항목:</strong>
            <ul>
              <li>회원 정보: 아이디, 비밀번호, 이름, 연락처</li>
              <li>위치 정보: 운전자의 인근 위치</li>
              <li>차량 정보: 차종, 차량번호, 수용 인원</li>
              <li>카풀 이용 정보: 시작/종료 위치 및 시간</li>
              <li>서비스 이용기록: 로그 정보</li>
            </ul>
          </li>
          <li><strong>선택 항목:</strong>
            <ul>
              <li>푸시 알림 수신 동의 여부</li>
              <li>백그라운드 위치 추적 동의 여부</li>
            </ul>
          </li>
        </ul>

        <h6>3. 개인정보의 보유 및 이용기간</h6>
        <ul>
          <li>회원 탈퇴 시 또는 서비스 종료 시까지</li>
          <li>법령에 따라 일정 기간 보관 가능</li>
          <li>카풀 기록은 최대 1년간 보관 후 파기</li>
        </ul>

        <h6>4. 동의를 거부할 권리 및 불이익</h6>
        <p>
          귀하는 동의를 거부할 권리가 있습니다.<br/>
          필수 항목 미동의 시 서비스 이용이 제한될 수 있습니다.
        </p>
      </ModalBox>
    </Backdrop>
  );
};

export default ConsentModalView;