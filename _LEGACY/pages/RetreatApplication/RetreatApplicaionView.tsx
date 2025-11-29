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
} from './RetreatApplicaionView.styled';
import Dropdown from '@components/Dropdown';
import TextInputB from '@components/TextInputB';
import RadioButton from '@components/RadioButton';
import MealRadioButton from '@components/MealRadioButton';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import { requestApplication, requestApplicationByUserAndRetreatId } from '@apis/index';
import usePageControll from '@hooks/usePageControll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationState, isLoadingState, userState } from '@modules/atoms';
import useConfirm from '@hooks/useConfirm';

const RetreatApplicationView = () => {
  const { handlePage } = usePageControll();
  const set_application = useSetRecoilState(applicationState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const user = useRecoilValue(userState);

  const [transfer, set_transfer] = useState("");
  const [bus, set_bus] = useState([0, 0]);
  const [carId, set_carId] = useState("");
  const [meal, set_meal] = useState([
    [0, 0, 0], [0, 0, 0], [0, 0, 0]
  ]);

  useEffect(() => {
    requestApplicationByUserAndRetreatId(user.userId, 1).then(() => {
      alert("작성된 수련회 신청서가 있습니다. 홈 화면으로 이동합니다.");
      handlePage("home");
    });
  }, []);

  useEffect(() => {
    if (transfer === "대형버스") {
      set_bus([1, 1]);
      set_carId("");
    } else {
      set_bus([0, 0]);
      set_carId("");
    }
  }, [transfer]);

  const confirmApplication = useConfirm("신청서 작성을 완료하시겠습니까?", () => handleApplication(), () => console.log("Cancled.."));

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

  const handleApplication = async () => {
    setIsLoading({ isLoading: true });
    if (!transfer) {
      alert("필수 항목을 모두 작성해주세요.");
      return setIsLoading({ isLoading: false });
    }
    requestApplication(
      user.userId,
      1,
      meal,
      transfer,
      bus,
      carId
    ).then(() => {
      setIsLoading({ isLoading: false });
      alert("수련회 신청서 작성이 완료되었습니다.");
      handlePage('home');
    }).catch((err) => {
      setIsLoading({ isLoading: false });
      alert("수련회 신청서 작성에 실패하였습니다.");
      console.log(err.response.data.message);
    });
  };

  return (
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
            onChange={set_transfer}
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
              initialValue={0}
              onChange={(value) => revertBusState(value)}
            />
        </InputBox>
        }
        {transfer === "자차" &&
          <CarIdInputView>
            <TextInputB placeHolder={'차량번호'} getter={carId} setter={set_carId} type={'text'} />
            <TextSub>자차일 경우 차량번호를 입력해주세요.</TextSub>
          </CarIdInputView>
        }
        <TextSub>* 선발대라면, 이동수단 - 선발대 선택해주세요.</TextSub>
        <IconButton
          label={'신청 완료'}
          onClick={confirmApplication}
          width='118px'
          height='48px'
          color={EColor.TEXT_200}
          backgroundColor={EColor.COLOR_PRIMARY}
          borderRadius='8px'
        />
      </FormContainer>
    </Container>
  );
};

export default RetreatApplicationView;
