import React, { useEffect, useState } from 'react';
import { Container, InfoText, ListItemButton, ListView, StyledImage } from './styles';
import usePageControll from '@hooks/usePageControll';
import { requestApplicationByUserAndRetreatId } from '@apis/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingState, userState } from '@modules/atoms';

import summer2024 from '@assets/images/retreat_list_2024_summer.png';
import winter2025 from '@assets/images/retreat_list_2025_winter.png';
import { Application } from '@type/states';

const images: Record<number, string> = {
  1: summer2024,
  2: winter2025,
};

const RetreatListView = () => {
  const { handlePage } = usePageControll();
  const setIsLoading = useSetRecoilState(isLoadingState);
  const user = useRecoilValue(userState);
  const [retreat, set_retreat] = useState<Application[]>([]);

  useEffect(() => {
    setIsLoading({ isLoading: true });
    requestApplicationByUserAndRetreatId(user.userId).then((res) => {
      set_retreat(res.data.application);
      setIsLoading({ isLoading: false });
    }).catch((err) => {
      console.log(err);
      alert("오류가 발생하였습니다.");
      setIsLoading({ isLoading: false });
    });
  }, []);

  return (
    <Container>
      <InfoText>수련회를 클릭하면 수정/확인이 가능합니다.</InfoText>
      <ListView>
        {retreat.length > 0 ? (
          [...retreat]
            .reverse()
            .map((item, index) => (
              <ListItemButton key={index} onClick={() => alert("구현중인 기능입니다!")}>
                <StyledImage src={images[item.retreatId]} />
              </ListItemButton>
            ))
        ) : (
          <InfoText>참여한 수련회가 없습니다.</InfoText>
        )}
      </ListView>
    </Container>
  );
};

export default RetreatListView;
