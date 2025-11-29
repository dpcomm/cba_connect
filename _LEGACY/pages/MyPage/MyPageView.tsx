import React from 'react';
import { Container, ListItemButton, Name, Version, VersionView } from './styles';
import usePageControll from '@hooks/usePageControll';
import packageJson from '../../../package.json';

const MyPageView = () => {
  const { handlePage } = usePageControll();

  return (
    <Container>
      <ListItemButton onClick={() => handlePage("edit-profile")}>
        내 정보 관리
      </ListItemButton>
      <ListItemButton onClick={() => handlePage("retreat-list")}>
        나의 수련회
      </ListItemButton>
      <ListItemButton onClick={() => handlePage("support")}>
        Support
      </ListItemButton>
      <VersionView>
        <Name>{packageJson.name}</Name>
        <Version>{packageJson.version}</Version>
      </VersionView>
    </Container>
  );
};

export default MyPageView;
