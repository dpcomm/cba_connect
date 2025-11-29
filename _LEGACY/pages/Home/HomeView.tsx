import React from 'react';
import {
  Bar,
  BarTextMain,
  BarTextView,
  ButtonView,
  Container,
  DDayView,
  Dot,
  HeaderCenter,
  HeaderGroupText,
  HeaderNameText,
  HeaderRight,
  HeaderView,
  ItemText,
  ItemView,
  Left,
  Line,
  MenuView,
  TextLight,
  DDayText,
  BarTextSubLeft,
  BarTextSubRight,
  NoticeView,
  NoticeTop,
  NoticeBottom,
  ApplicationView,
  SvgView,
  ApplicationViewText,
} from './HomeView.styled';
import { EColor } from '@styles/color';
import SvgIcon from '@components/SvgIcon';
import usePageControll from '@hooks/usePageControll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationState, isLoadingState, userState } from '@modules/atoms';
import { useState, useEffect } from 'react';
import useConfirm from '@hooks/useConfirm';
import { requestApplicationByUserAndRetreatId, requestLogout } from '@apis/index';
import { schedule } from '@pages/TimeTable/dummy';

const HomeView = () => {
  const { handlePage } = usePageControll();
  const setIsLoading = useSetRecoilState(isLoadingState);
  const set_application = useSetRecoilState(applicationState);
  const user = useRecoilValue(userState);

  const [dDay, setDDay] = useState<number | null>(null);
  const [prevTime, set_prevTime] = useState('');
  const [currentTime, set_currentTime] = useState('');
  const [nextTime, set_nextTime] = useState('');

  const calculateDDay = (targetDate:Date | number | string): number => {
    const today = new Date();
    const target = new Date(targetDate);
    const difference = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return difference;
  };

  const getCurrentTimeTable = () => {
    const now = new Date().getTime();
    let prev = null,
      current = null,
      next = null;
    const allActivities = schedule.day1.concat(schedule.day2, schedule.day3);

    for (let i = 0; i < allActivities.length; i++) {
      const activity = allActivities[i];
      if (now < activity.startTime) {
        next = activity.activity;
        break;
      }
      if (now >= activity.startTime && now < activity.endTime) {
        current = activity.activity;
      }
      if (now >= activity.endTime) {
        prev = activity.activity;
      }
    }
    set_prevTime(prev);
    set_currentTime(current);
    set_nextTime(next);
  };

  useEffect(() => {
    getCurrentTimeTable();
    setDDay(calculateDDay(schedule.day1[0].startTime));
  }, [user.userId]);

  const confirmRegister = useConfirm(
    '수련회 신청서가 이미 작성되었습니다. 신청서를 수정하겠습니까?',
    () => handlePage('winter26-application'),
    () => console.log('Cancled..'),
  );

  const handleApplicationPage = () => {
    setIsLoading({ isLoading: true });
    requestApplicationByUserAndRetreatId(user.userId, 4)
      .then((res) => {
        set_application({
          ...res.data.application,
        });
        setIsLoading({ isLoading: false });
        confirmRegister();
      })
      .catch((err) => {
        if (err.response.data.message === 'Application not exist') handlePage('winter26-application');
        setIsLoading({ isLoading: false });
      });
  };

  const handleLogout = useConfirm(
    '로그아웃 하시겠습니까? ',
    async () => {
      setIsLoading({ isLoading: true });
      await localStorage.removeItem('access_token');
      await localStorage.removeItem('refresh_token');
      requestLogout(user.id)
        .then(() => {
          window.location.href = '';
          alert('로그아웃이 완료되었습니다.');
          setIsLoading({ isLoading: false });
        })
        .catch((err) => {
          // console.log(err);
          alert('로그아웃에 실패하였습니다.');
          setIsLoading({ isLoading: false });
        });
    },
    () => null,
  );

  return (
    <Container>
      <HeaderView>
        <SvgIcon name={'cba_logo'} width={48} height={48} fill={'none'} />
        <HeaderCenter>
          <HeaderGroupText>{user.group}</HeaderGroupText>
          <HeaderNameText>{user.name} 님</HeaderNameText>
        </HeaderCenter>
        <HeaderRight onClick={() => handlePage('my-page')}>
          <SvgIcon name={'chevron_right'} width={28} height={28} fill={EColor.COLOR_PRIMARY} />
        </HeaderRight>
      </HeaderView>
      <ApplicationView onClick={handleApplicationPage}>
        <SvgView>
          <SvgIcon name={'application_check'} />
        </SvgView>
        <ApplicationViewText>
          수련회 신청하기
        </ApplicationViewText>
      </ApplicationView>
      {/* <DDayView>
        {currentTime ? (
          <>
            <BarTextView>
              <BarTextSubLeft>{prevTime}</BarTextSubLeft>
              <BarTextMain>{currentTime}</BarTextMain>
              <BarTextSubRight>{nextTime}</BarTextSubRight>
            </BarTextView>
            <Bar>
              <Dot color={EColor.COLOR_PRIMARY} />
              <Dot color={EColor.COLOR_PRIMARY} />
              <Dot color={EColor.TEXT_500} />
            </Bar>
          </>
        ) : (
        <DDayText>
          <div className="day"> D-{dDay}</div>
          <div className="bible">
            또 여기있다 저기 있다고도 못하리니 <br />
            하나님의 나라는 너희 안에 있느니라
            <br />
            (눅 17:21)
          </div>
        </DDayText>
        )}
        <DDayText>
          <div className="day"> D-{dDay}</div>
          <div className="bible">
            또 여기있다 저기 있다고도 못하리니 <br />
            하나님의 나라는 너희 안에 있느니라
            <br />
            (눅 17:21)
          </div>
        </DDayText>
      </DDayView> */}
      {/* <Left onClick={() => handlePage('youtube')}>수련회 라이브 바로가기 ▶</Left> */}
      {/* <NoticeView>
        <NoticeTop>
          <SvgIcon name={'notice'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
          <h3>공지사항</h3>
        </NoticeTop>
        <NoticeBottom></NoticeBottom>
      </NoticeView> */}
      {/* <MenuView>
        <ItemView onClick={() => handlePage('holyday-pass')}>
          <SvgIcon name={'home_pass'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
        </ItemView>
        <ItemView onClick={() => handlePage('carpool-download')}>
          <SvgIcon name={'home_carpool'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
        </ItemView>
      </MenuView> */}
      {/* <MenuView>
        <ItemView onClick={() => handlePage('retreat-info')}>
          <SvgIcon name={'home_guide'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
        </ItemView>
        <ItemView onClick={() => handlePage('youtube')}>
          <SvgIcon name={'home_live'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
        </ItemView>
        <ItemView onClick={() => handlePage('retreat-payment')}>
          <SvgIcon name={'home_payment'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
        </ItemView>
      </MenuView> */}
      <TextLight onClick={handleLogout}>로그아웃</TextLight>
    </Container>
  );
};

export default HomeView;
