import React, { useEffect, useState } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';
import Carpool1 from '@assets/images/carpool_1.png';
import Carpool2 from '@assets/images/carpool_2.png';
import Carpool3 from '@assets/images/carpool_3.png';
import CarpoolIcon from '@assets/images/carpool_icon.png';
import {
  Body,
  ButtonView,
  Container,
  Description,
  Developer,
  Footer,
  FooterText,
  Header,
  Icon,
  Info,
  Section,
  SectionTitle,
  Title,
  UpdateList,
  CarouselItem,
  Carousel,
  Button,
  Version,
} from './styles';
import { requestApplicationVersion } from '@apis/index';

interface AppVersion {
  name: string;
  versionName: string;
  versionCode: number;
  description: string;
  releaseDate: string;
  author: string;
  updateNotes: string[];
  updateUrl: string;
}

const screenshots = [
  Carpool1,
  Carpool2,
  Carpool3,
];

const CarpoolDownload = () => {
  const [versionData, setVersionData] = useState<AppVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requestApplicationVersion()
      .then(res => {
        setVersionData(res.data.version);
      })
      .catch(err => {
        console.error(err);
        setError('버전 정보를 불러오는 데 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {
    const apkUrl = 'https://joey-s3.s3.ap-northeast-2.amazonaws.com/cba_connect_v1.0.0.apk';
    if (isAndroid) {
      window.open(apkUrl, '_blank');
    } else if (isIOS) {
      alert('iOS 버전은 곧 출시 예정입니다!');
    } else {
      alert('지원하지 않는 플랫폼입니다. Android 또는 iOS 기기에서 접속해주세요.');
    }
  };

  if (loading) {
    return <Container>로딩 중…</Container>;
  }
  if (error) {
    return <Container>{error}</Container>;
  }
  if (!versionData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <Icon src={CarpoolIcon} alt={`${versionData.name} icon`} />
        <Info>
          <Title>{versionData.name}</Title>
          <Developer>{versionData.author}</Developer>
          <Version>버전 {versionData.versionName}</Version>
          <ButtonView>
            <Button onClick={handleDownload}>앱 다운로드</Button>
          </ButtonView>
        </Info>
      </Header>

      <Carousel>
        {screenshots.map((src, idx) => (
          <CarouselItem key={idx} src={src} alt={`Screenshot ${idx + 1}`} />
        ))}
      </Carousel>

      <Body>
        <Section>
          <SectionTitle>앱 설명</SectionTitle>
          {/* <Description>{versionData.description}</Description> */}
          <Description>
            CBA Connect의 카풀 서비스는 수련회에 참석하는 CBA 대학청년부 청년들을 위한 편리한 카풀 기능을 제공합니다. 이 앱을 통해 수련회장까지, 집까지 효율적으로 이동할 수 있습니다. 카풀 서비스를 통해 환경 보호와 비용 절감에도 기여할 수 있습니다.
          </Description>
        </Section>

        <Section>
          <SectionTitle>최신 업데이트 ({versionData.releaseDate})</SectionTitle>
          <UpdateList>
            {versionData.updateNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </UpdateList>
        </Section>
      </Body>

      <Footer>
        <FooterText>
          이 앱은 CBA Connect의 일부로, 카풀 서비스를 제공합니다.
        </FooterText>
      </Footer>
    </Container>
  );
};

export default CarpoolDownload;
