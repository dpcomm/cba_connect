import React, { useState } from 'react';
import logo from '@assets/images/retreat_logo.png';
import {
  CarIdInputView,
  Container,
  FormContainer,
  InputBox,
  LogoImage,
  TextForm,
  TextFormLight,
  TextSub,
  TextTitle
} from './AuthUserView.styled';

import TextInputB from '@components/TextInputB';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import usePageControll from '@hooks/usePageControll';
import { useRecoilValue } from 'recoil';
import { userState } from '@modules/atoms';
import { NameText } from '@pages/Login/LoginView.styled';
import useConfirm from '@hooks/useConfirm';
import { check } from 'assets/svgs';


const AuthUserView = () => {
  const {handlePage} = usePageControll();
  const user = useRecoilValue(userState);
  const [password,set_password] = useState();
  
  const checkpassword = async() => {
    if (user.password !== password) {
      alert("패스워드가 일치하지 않습니다.");
      return;}
      handlePage('retreat-appinfo');
    }  
  
    return (
    <>
      <Container>
        <FormContainer>
          <TextTitle>회원 정보 수정</TextTitle>
          <NameText>{user.name}님의 회원정보 수정을 위한 인증절차가 필요합니다.</NameText>
          <InputBox>
            <TextInputB placeHolder={'비밀번호를 입력해주세요.'} getter={password} setter={set_password}/>
          </InputBox>
          <IconButton
            label={'확인'}
            onClick={checkpassword}
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

export default AuthUserView;
