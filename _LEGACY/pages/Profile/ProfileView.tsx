import React, { useState } from 'react';
import { GroupInputView,Container, InputView, LogoBold, LogoLight, LogoView, SvgBox, TextSub, InputBox } from './ProfileView.styled';
import TextInputB from '@components/TextInputB';
import PhoneInput from '@components/PhoneInput';
import SvgIcon from '@components/SvgIcon';
import { EColor } from '@styles/color';
import RadioButton from '@components/RadioButton';
import Dropdown from '@components/Dropdown';
import { IconButton } from '@components/IconButton';
import useConfirm from '@hooks/useConfirm';
import { requestUserDelete, updateUserInfo } from '@apis/index';
import usePageControll from '@hooks/usePageControll';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoadingState, userState } from '@modules/atoms';

const ProfileView = () => {
  const { handlePage } = usePageControll();
  const setIsLoading = useSetRecoilState(isLoadingState);
  const [user, set_user] = useRecoilState(userState);

  const [name, set_name] = useState(user.name);
  // const [password, set_password] = useState("");
  // const [password2, set_password2] = useState("");
  const [gender, set_gender] = useState(user.gender);
  const [phone, set_phone] = useState(user.phone);
  const [group, set_group] = useState(user.group);
  const [birth, set_birth] = useState(user.birth);
  const [etcGroup, set_etcGroup] = useState("");

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

  const handleUpdateProfile = async () => {
    setIsLoading({ isLoading: true });
    if (!name || !phone || !group || !birth) {
      setIsLoading({ isLoading: false });
      return alert("회원 정보를 모두 입력해주세요.");
    }
    const reg_name = /^[가-힣]{2,4}$/;
    if (!reg_name.test(name)) {
      setIsLoading({ isLoading: false });
      return alert("이름은 2자 이상 실명으로 입력해주세요.");
    }
    try {
      await updateUserInfo(
        user.userId,
        name,
        // password,
        gender ? "female" : "male",
        phone,
        group === "기타" ? etcGroup : group,
        birth
      );
      setIsLoading({ isLoading: false });
      set_user({
        ...user,
				name: name,
				group: group === "기타" ? etcGroup : group,
				phone: phone,
				birth: birth,
				gender: gender ? "female" : "male",
			});
      alert("회원 정보 수정이 완료되었습니다.");
      handlePage('home');
    } catch (err) {
      setIsLoading({ isLoading: false });
      console.log('Error updating user data:', err);
      alert("회원 정보 수정에 실패하였습니다.");
    }
  };

  const handleAccountDelete = async () => {
    setIsLoading({ isLoading: true });
    try {
      await requestUserDelete(user.id);
      alert("계정 삭제가 완료되었습니다.");
      await localStorage.removeItem('access_token');
      await localStorage.removeItem('refresh_token');

      handlePage('');
      setIsLoading({ isLoading: false });
    } catch (err) {
      setIsLoading({ isLoading: false });
      console.log('Error deleting account:', err);
      alert("계정 삭제에 실패하였습니다.");
    }
  };
  const confirmUpdate = useConfirm("회원정보를 수정 하시겠습니까?", handleUpdateProfile);
  const confirmDelete = useConfirm("계정을 삭제하시겠습니까? 서비스의 모든 데이터가 삭제됩니다.", handleAccountDelete);



	return (
    <Container>
      <LogoView>
				<LogoLight>Welcome to</LogoLight>
				<LogoBold>CBA</LogoBold>
			</LogoView>
      <InputView>
        <InputBox>
          <SvgBox><SvgIcon name={'user'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>
          <TextInputB placeHolder={'이름을 입력해주세요.'} getter={name} setter={set_name} maxLength={4} />
        </InputBox>
        {/* <InputBox>
          <SvgBox><SvgIcon name={'password'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>
          <TextInputB placeHolder={'비밀번호를 입력해주세요.'} getter={password} setter={set_password} maxLength={24} type='password' />
        </InputBox>
        <TextSub>* 영문, 숫자포함 10자 이상</TextSub>
        <InputBox>
          <SvgBox><EmptyBox /></SvgBox>
          <TextInputB placeHolder={'비밀번호를 다시 입력해주세요.'} getter={password2} setter={set_password2} maxLength={24} type='password' />
        </InputBox> */}
        <InputBox>
          <SvgBox><SvgIcon name={'gender'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>
          <RadioButton
            items={[
              { text: '남자', value: 0 },
              { text: '여자', value: 1 },
            ]}
            initialValue={convertGenderToIndex(gender)}
            onChange={set_gender}
          />
        </InputBox>
        <InputBox>
          <SvgBox><SvgIcon name={'user'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>
          <PhoneInput getter={phone} setter={set_phone} />
        </InputBox>
        <InputBox>
          <SvgBox><SvgIcon name={'users'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>
          <Dropdown options={["배윤희&김준영M", "노시은&윤승오M", "권수영&임강미M", "가족실","새친구","기타"]} placeholder='소그룹을 선택해주세요.' initialValue={group} onChange={set_group}/>
        </InputBox>
        {group === "기타" &&
            <GroupInputView>
							<TextInputB placeHolder={'기관, 지예배당 및 교단교회 입력'} getter={etcGroup} setter={set_etcGroup} type={'text'} />
            </GroupInputView>
        }
        <TextSub>* 지예배당/교단교회 - [기타]를 선택해 작성해주세요.</TextSub>
        <InputBox>
          <SvgBox><SvgIcon name={'cake'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>
          <TextInputB placeHolder={'생년월일을 입력해주세요.'} getter={formatDate(birth)} setter={set_birth} type='date' />
        </InputBox>
      </InputView>
      <IconButton
        label={'수정 완료'}
        onClick={confirmUpdate}
        width='118px'
        height='48px'
        color={EColor.TEXT_200}
        backgroundColor={EColor.COLOR_PRIMARY}
        borderRadius='8px'
      />
      <br></br>
      <IconButton
        label={'계정 삭제'}
        onClick={confirmDelete}
        width='118px'
        height='48px'
        color={EColor.TEXT_200}
        backgroundColor={EColor.RED}
        tintColor={EColor.RED}
        borderRadius='8px'
      />
    </Container>
  );
};

export default ProfileView;