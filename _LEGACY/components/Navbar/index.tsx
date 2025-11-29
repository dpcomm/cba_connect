import SvgIcon from '@components/SvgIcon';
import { HeaderBar } from '@components/HeaderBar';
import usePageControll from '@hooks/usePageControll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { naviState } from '@modules/atoms';
import { NavInfo, Page } from '@type/index';
import { useEffect } from 'react';
import { LeftView } from '@components/HeaderBar/HeaderBar.styled';

/* 페이지 라우팅 시 해당 부분 수정 필요. */
const noneHeaderTarget = ['', 'home', 'not-login'];
const pageLabel = {
  [Page.home]: '홈',
  [Page.register]: '회원가입',
  [Page.retreatInfo]: '수련회 안내',
  [Page.retreatLocation]: '수련회 위치',
  [Page.retreatPayment]: '수련회 납부',
  [Page.retreatApplication]: '수련회 신청',
  [Page.retreatAppInfo]: "수련회 신청서 조회 & 수정",
  [Page.editProfile]: "내 정보 관리",
  [Page.myPage]: "마이페이지",
  [Page.youtube]: "유튜브 라이브",
  [Page.youtubeOld]: "이전 라이브",
  [Page.timeTable]: "수련회 일정표",
  [Page.prayTalk]: "기도 TALK",
  [Page.holydayPass]: "Pass 발급 신청",
  [Page.winter26Application]: "[바라봄] 수련회 신청",
  [Page.retreatList]: "나의 수련회",
  [Page.resetPassword]: "비밀번호 재설정",
};

const Navbar = () => {
  const { navigation, handlePrevPage } = usePageControll();
  const set_navInfo = useSetRecoilState<NavInfo>(naviState);
  const get_navInfo = useRecoilValue<NavInfo>(naviState);

  useEffect(() => {
    set_navInfo((prev) => ({
      ...prev,
      page: window.location.pathname.slice(1),
    }));

    const handlePopState = () => {
      const url = window.location.pathname.slice(1);
      if (navigation.history.includes(url)) {
        const history = navigation.history.slice(0, navigation.history.findIndex((value) => value == url) + 1);
        set_navInfo({
          page: url,
          history: history,
        });
      } else {
        set_navInfo((prev) => ({
          page: url,
          history: [...prev.history, url],
        }));
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (noneHeaderTarget.includes(navigation.page)) {
      set_navInfo((prev) => ({
        ...prev,
        history: [navigation.page],
      }));
    }
  }, [navigation.page]);

  if (noneHeaderTarget.includes(navigation.page)) {
    return null;
  } else {
    return (
      <HeaderBar
        left=
          {
            <LeftView>
              <SvgIcon name={'back'} width={24} height={24} fill={'none'} />
              {pageLabel[get_navInfo.page]}
            </LeftView>
          }
        onClickLeft={handlePrevPage} />
    );
  }
};

export default Navbar;
