import React, { useState } from 'react';
import AllUser from './views/AllUser';
import RegistrationStatus from './views/RegistrationStatus';
import MealList from './views/MealList';
import MediaLink from './views/MediaLink';
import SvgIcon from '@components/SvgIcon';
import BackItemButton from '@components/BackItemButton';
import { BackItemButtonContainer, Container, SideBar, TopView } from './BackofficeView.styled';
import IconButton from '@components/Button';
import { EColor } from '@styles/color';


const BackofficeView = () => {
  const [page, set_page] = useState(0);

  const handleLogout = () => {
    console.log("로그아웃 되었습니다.");
  };

  return (
    <Container>
      <SideBar>
        <TopView>
          <SvgIcon name={'cba_logo'} width={150} height={150} fill={'none'} />
          <BackItemButtonContainer>
            <BackItemButton
              label="전체 계정 정보"
              onClick={() => set_page(0)}
              isClicked={page === 0}
            >
              <SvgIcon name={'graph'} width={18} height={18} fill={'none'} />
            </BackItemButton>
            <BackItemButton
              label="수련회 등록 현황"
              onClick={() => set_page(1)}
              isClicked={page === 1}
            >
              <SvgIcon name={'document'} width={20} height={20} fill={'none'} stroke={EColor.TEXT_600} />
            </BackItemButton>
            <BackItemButton
              label="식수 파악"
              onClick={() => set_page(2)}
              isClicked={page === 2}
            >
              <SvgIcon name={'meal'} width={18} height={18} fill={'none'} />
            </BackItemButton>
            <BackItemButton
              label="유튜브 실황 링크 "
              onClick={() => set_page(3)}
              isClicked={page === 3}
            >
              <SvgIcon name={'youtube'} width={17} height={16} fill={'none'} />
            </BackItemButton>
          </BackItemButtonContainer>
        </TopView>
        <IconButton
          label={'로그아웃'}
          onClick={handleLogout}
          svg={<SvgIcon name={'logout'} width={20} height={20} fill={EColor.TEXT_500} />}
          backgroundColor={EColor.TEXT_200}
          borderWidth='0'
          color={EColor.TEXT_700}
          width='100%'
        />
      </SideBar>
      {page === 0 && <AllUser />}
      {page === 1 && <RegistrationStatus />}
      {page === 2 && <MealList />}
      {page === 3 && <MediaLink />}
    </Container>
  );
};

export default BackofficeView;
