import React, { useState } from 'react';
import {
  Container,
  InputGroup,
  Title,
  SubTitle,
  StyledLabel,
  ErrorMessage,
  GroupInputView,
  TextSub
} from './styles';
import { useSetRecoilState } from 'recoil';
import { isLoadingState, } from '@modules/atoms';

import Dropdown from '@components/Dropdown';
import TextInputB from '@components/TextInputB';
import PhoneInput from '@components/PhoneInput';
import RadioButton from '@components/RadioButton';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import { requestCheckUserWithoutPassword, requestResetPassword } from '@apis/index';
import usePageControll from '@hooks/usePageControll';

const ResetPasswordView = () => {
  const { handlePage } = usePageControll();
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [isAuth, set_isAuth] = useState(false);
  const [error, set_error] = useState('');

  const [userId, set_userId] = useState('');
  const [name, set_name] = useState('');
  const [gender, set_gender] = useState(0);
  const [phone, set_phone] = useState('');
  const [birth, set_birth] = useState('');
  const [group, set_group] = useState('');
  const [etcGroup, set_etcGroup] = useState('');

  const [password, set_password] = useState('');
  const [password2, set_password2] = useState('');

  const formatDate = (date) => {
    const userbirth = new Date(date);
    const formbirth = userbirth.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formbirth.replace(/\s/g, '').replace(/\./g, '-').slice(0, -1);
  };
  const convertGenderToIndex = (gender:string) => {
    return gender === "female" ? 1 : 0;
  };

  const handleCheckUser = async () => {
    if (!userId || !name || !String(gender) || !phone || !group || !birth) {
      set_error('모든 필드를 입력해주세요.');
      return;
    }
    setIsLoading({ isLoading: true });
    try {
      const data = await requestCheckUserWithoutPassword(
        userId,
        name,
        gender ? "female" : "male",
        phone,
        group === "기타" ? etcGroup : group,
        birth,
      );
      alert('본인확인이 완료되었습니다.');
      set_isAuth(true);
      setIsLoading({ isLoading: false });
    } catch (err: unknown) {
      console.error('Error resetting password:', err);
      if (err.response.data.message === "User does not exist") {
        alert("입력하신 정보로 가입된 계정이 없습니다. 다시 확인해주세요.");
        setIsLoading({ isLoading: false });
        return;
      }
      if (err.response.data.message === "User information does not match") {
        alert("입력하신 정보가 일치하지 않습니다. 다시 확인해주세요.");
        setIsLoading({ isLoading: false });
        return;
      }
      set_error('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
      setIsLoading({ isLoading: false });
    }
  };

  const handleResetPassword = async () => {
    if (!password || !password2) {
      set_error('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== password2) {
      set_error('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading({ isLoading: true });
    try {
      await requestResetPassword(userId, password);
      alert('비밀번호 재설정이 완료되었습니다.');
      setIsLoading({ isLoading: false });
      handlePage('');
    } catch (err) {
      if (err.response.data.message === "Password pattern unfulfilled") {
        set_error('비밀번호 조건을 확인해주세요. 비밀번호는 영문, 숫자 포함 10자 이상이어야 합니다.');
        setIsLoading({ isLoading: false });
        return;
      }
      console.error('Error resetting password:', err);
      set_error('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
      setIsLoading({ isLoading: false });
    }
  };

  if (isAuth) {
    return (
      <Container>
        <Title>비밀번호 재설정</Title>
        <SubTitle>새로운 비밀번호를 입력해주세요.</SubTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputGroup>
          <StyledLabel>비밀번호 입력</StyledLabel>
          <TextInputB placeHolder={'비밀번호를 입력해주세요.'} getter={password} setter={set_password} maxLength={24} type='password' />
        </InputGroup>

        <InputGroup>
          <TextInputB placeHolder={'비밀번호를 다시 입력해주세요.'} getter={password2} setter={set_password2} maxLength={24} type='password' />
          <TextSub>* 영문, 숫자포함 10자 이상</TextSub>
        </InputGroup>
        <IconButton
          label={'수정하기'}
          onClick={handleResetPassword}
          width='118px'
          height='48px'
          color={EColor.TEXT_200}
          backgroundColor={EColor.COLOR_PRIMARY}
          borderRadius='8px'
        />
      </Container>
    );
  }
  return (
    <Container>
      <Title>본인확인</Title>
      <SubTitle>계정 정보를 입력해주세요.</SubTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputGroup>
        <StyledLabel>아이디</StyledLabel>
        <TextInputB placeHolder={'아이디를 입력해주세요'} getter={userId} setter={set_userId} />
      </InputGroup>

      <InputGroup>
        <StyledLabel>이름</StyledLabel>
        <TextInputB placeHolder={'이름을 입력해주세요'} getter={name} setter={set_name} />
      </InputGroup>

      <InputGroup>
        <StyledLabel>성별</StyledLabel>
        <RadioButton
            items={[
              { text: '남자', value: 0 },
              { text: '여자', value: 1 },
            ]}
            initialValue={convertGenderToIndex(gender)}
            onChange={set_gender}
          />
      </InputGroup>

      <InputGroup>
        <StyledLabel>전화번호</StyledLabel>
        <PhoneInput getter={phone} setter={set_phone} />
      </InputGroup>
      <InputGroup>
        <StyledLabel>소그룹</StyledLabel>
        <Dropdown
          options={["권수영M", "노시은M", "반일섭M", "대청2부", "대청3부","기타"]}
          placeholder='소그룹을 선택해주세요.'
          initialValue={group}
          onChange={set_group} />
      </InputGroup>
        {group === "기타" &&
            <GroupInputView>
							<TextInputB placeHolder={'지예배당 및 교단교회 입력'} getter={etcGroup} setter={set_etcGroup} type={'text'} maxLength={12} />
            </GroupInputView>
        }
        <TextSub>* 지예배당/교단교회 - [기타]를 선택해 작성해주세요.</TextSub>
      <InputGroup>
        <StyledLabel>생년월일</StyledLabel>
        <TextInputB placeHolder={'생년월일을 입력해주세요.'} getter={formatDate(birth)} setter={set_birth} type='date' />
      </InputGroup>
      <TextSub>본 페이지는 임시로 운영 중인 비밀번호 재설정 페이지입니다. 타인의 정보를 입력하거나 무단으로 사용하여 개인정보를 침해하는 행위를 삼가 주시기 바랍니다.</TextSub>
      <TextSub>비밀번호를 제외한 아이디 및 기타 개인정보를 알지 못하시는 경우, 담당 선교사님 또는 개기자 팀에 문의하시면 신속히 조치해 드리겠습니다.</TextSub>
      <IconButton
        label={'다음'}
        onClick={handleCheckUser}
        width='118px'
        height='48px'
        color={EColor.TEXT_200}
        backgroundColor={EColor.COLOR_PRIMARY}
        borderRadius='8px'
      />
    </Container>
  );
};

export default ResetPasswordView;
