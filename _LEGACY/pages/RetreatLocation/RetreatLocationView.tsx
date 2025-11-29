import React from 'react';
import { ButtonView, Container, ImageLocation, TextBody, TextSub, TextTitle } from './RetreatLocationView.styled';
import retreatMap from '@assets/images/retreat_map.png';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';

const RetreatLocationView = () => {
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText("경기도 안산시 단원구 풍전로 62");
      alert('클립보드에 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

	return (
    <Container>
      <TextTitle>수련회 장소</TextTitle>
      <TextSub>안산청소년수련원</TextSub>
      <ImageLocation src={retreatMap} />
      <TextBody>경기도 안산시 단원구 풍전로 62</TextBody>
      <ButtonView>
        <IconButton
          label={'주소 복사하기'}
          height='32px'
          onClick={handleCopyClipBoard}
          color={EColor.TEXT_200}
          backgroundColor={EColor.COLOR_PRIMARY_SUB1}
          borderRadius='8px'
          borderWidth='0'
        />
      </ButtonView>
    </Container>
  );
};

export default RetreatLocationView;