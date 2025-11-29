import SvgIcon from "@components/SvgIcon";
import { Body, Container, TitleSubText, TitleText } from "./styles";

const MaintenanceView = () => {
  return (
    <Container>
      <SvgIcon name={"cba_logo"} width={188} height={188} fill={""} />
      <TitleText>CBA Connect</TitleText>
      <TitleSubText>수련회 등록관리 서비스</TitleSubText>
      <Body>
        시스템 점검으로 인하여 일시적으로
        <br />
        홈페이지 접속이 불가능합니다.
      </Body>
    </Container>
  );
};

export default MaintenanceView;