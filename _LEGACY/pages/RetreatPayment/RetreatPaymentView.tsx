import React, { useEffect, useState } from 'react';
import { ButtonView, Container, PaymentView, TextBody, TextBodyUnderLine, TextPayment, TextPaymentBody, TextPaymentSub } from './RetreatPayment.styled';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import SvgIcon from '@components/SvgIcon';
import { requestApplicationByUserAndRetreatId } from '@apis/index';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoadingState, userState } from '@modules/atoms';

const RetreatPaymentView = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [feePaid, set_feePaid] = useState("미신청");
  const user = useRecoilState(userState);
  useEffect(() => {
    setIsLoading({ isLoading: true });
    requestApplicationByUserAndRetreatId(user[0].userId, 3).then((res) => {
      if (res.data.application.feePaid) {
        setIsLoading({ isLoading: false });
        return set_feePaid("납부완료");
      }
      setIsLoading({ isLoading: false });
      return set_feePaid("납부전");
    }).catch((err) => {
      if (err.response.data.message === "Application not exist") set_feePaid("미신청");
      setIsLoading({ isLoading: false });
    });
  }, []);

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText("카카오뱅크 79795194749");
      alert('클립보드에 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

	return (
    <Container>
      {feePaid === "납부전" && (
        <PaymentView>
          <SvgIcon name={'check_lined'} width={58} height={58} fill={EColor.TEXT_200} stroke={EColor.TEXT_500} />
          <TextPaymentSub>회비 납부 전</TextPaymentSub>
          <TextPaymentBody>아래 계좌 번호를 통해 납부해주세요 :)</TextPaymentBody>
        </PaymentView>
      )}
      {feePaid === "납부완료" && (
        <PaymentView>
          <SvgIcon name={'check_lined'} width={58} height={58} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY_SUB1} />
          <TextPayment>회비 납부 완료</TextPayment>
        </PaymentView>
      )}
      {feePaid === "미신청" && (
        <PaymentView>
          <TextPaymentSub>수련회 신청 필요</TextPaymentSub>
          <TextPaymentBody>수련회 신청서를 먼저 작성해주세요.</TextPaymentBody>
        </PaymentView>
      )}
      <TextBody>수련회비 납부 및 후원계좌</TextBody>
      <TextBodyUnderLine>카카오뱅크 79795194749 배윤희</TextBodyUnderLine>
      <TextBodyUnderLine>70,000원</TextBodyUnderLine>
      <ButtonView>
        <IconButton
          label={'계좌번호 복사하기'}
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

export default RetreatPaymentView;