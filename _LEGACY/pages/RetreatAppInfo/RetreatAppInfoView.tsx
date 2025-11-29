import React, { useEffect, useState } from 'react';
import logo from '@assets/images/retreat_grace_logo.png';
import {
  CarIdInputView,
  Container,
  FormContainer,
  InputBox,
  LogoImage,
  MealButton,
  MealButtonFalse,
  TextForm,
  TextFormLight,
  TextSub,
} from './RetreatAppInfoView.styled';
import Dropdown from '@components/Dropdown';
import TextInputB from '@components/TextInputB';
import RadioButton from '@components/RadioButton';
import MealRadioButton from '@components/MealRadioButton';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import usePageControll from '@hooks/usePageControll';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { applicationState, isLoadingState } from '@modules/atoms';
import useConfirm from '@hooks/useConfirm';
import { requestApplication, requestApplicationByUserAndRetreatId } from '@apis/index';

const RetreatAppInfoView = () => {
  const { handlePage } = usePageControll();
  const setIsLoading = useSetRecoilState(isLoadingState);
  const application = useRecoilState(applicationState);

  useEffect(() => {
    requestApplicationByUserAndRetreatId(application[0].userId, 1).then(() => {
    }).catch((err) => {
      if (err.response.data.message === "Application not exist") {
        alert("등록된 수련회 신청서가 없습니다. 수련회 신청 페이지로 이동합니다.");
        handlePage("winter26-application");
      }
    });
  }, []);

  const [transfer, set_transfer] = useState(application[0].surveyData.transfer.transfer);
  const [bus, set_bus] = useState(application[0].surveyData.transfer.bus);
  const [carId, set_carId] = useState(application[0].surveyData.transfer['own-car']);
  const [meal, set_meal] = useState(application[0].surveyData.meal);

  const confirmApplication = useConfirm("설문을 수정하시겠습니까? ", () => handleApplication() , () => console.log("Cancled.."));

  const revertBusState = (value: number) => {
    switch (value) {
      case 0:
        set_bus([1, 1]);
        break;
      case 1:
        set_bus([1, 0]);
        break;
      case 2:
        set_bus([0, 1]);
        break;
    }
  };

  const convertInitialBusState = () => {
    if (bus[0] === 1 && bus[1] === 1) {
      return 0;
    }
    if (bus[0] === 1 && bus[1] === 0) {
      return 1;
    }
    if (bus[0] === 0 && bus[1] === 1) {
      return 2;
    }
  };

  const handleApplication = async () => {
    requestApplication(
      application[0].userId,
      meal,
      transfer,
      bus,
      carId
    ).then(() => {
      setIsLoading({ isLoading: false });
      alert("수련회 신청서 수정이 완료되었습니다.");
      handlePage('home');
    }).catch((err) => {
      setIsLoading({ isLoading: false });
      alert("수련회 신청서 수정에 실패하였습니다.");
      console.log(err.response.data.message);
    });
  };

  return (
    <>
      <Container>
        <LogoImage src={logo} />
        <FormContainer>
          <InputBox>
            <TextForm>
              식사 여부
              <MealButton>ON</MealButton>
              <MealButtonFalse>OFF</MealButtonFalse>
            </TextForm>
						<MealRadioButton
							dates={['8/23', '8/24', '8/25']}
							mealData={meal}
							disabled={[
								[true, true, false],
								[false, false, false],
								[false, false, true]
							]}
							onMealChange={set_meal}
						/>
          </InputBox>
          <InputBox>
            <TextForm>이동 수단</TextForm>
            <Dropdown
              initialValue={transfer}
              onChange={(set_transfer)}
              placeholder='이동수단 선택'
              options={['대형버스', '대중교통', '자차', '선발대']}
            />
          </InputBox>
          {transfer === "대형버스" &&
            <InputBox>
              <TextFormLight>대형버스</TextFormLight>
              <RadioButton
                items={[
                  { text: '왕복', value: 0 },
                  { text: '본당→안산', value: 1 },
                  { text: '안산→본당', value: 2 },
                ]}
                initialValue={convertInitialBusState()}
                onChange={(value) => revertBusState(value)}
              />
          </InputBox>
          }
          {transfer === "자차" &&
            <CarIdInputView>
              <TextInputB placeHolder={'차량번호'} getter={carId} setter={set_carId}
               type={'text'} />
              <TextSub>자차일 경우 차량번호를 입력해주세요.</TextSub>
            </CarIdInputView>
          }
          {/* <InputBox>
            <TextForm>주민등록번호</TextForm>
            <IdnInput getter={surveyData.idn} setter={(value) => handleChange('idn',value)}/>
          </InputBox> */}
          <IconButton
            label={'수정 완료'}
            onClick={confirmApplication}
            width='118px'
            height='48px'
            color={EColor.TEXT_200}
            backgroundColor={EColor.COLOR_PRIMARY}
            borderRadius='8px'
          />
        </FormContainer>

      </Container>
    </>
  );
};

export default RetreatAppInfoView;
