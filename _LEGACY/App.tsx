import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Navbar from '@components/Navbar';
import { Page } from './types';
import RetreatInfo from '@pages/RetreatInfo';
import Home from '@pages/Home';
import Backoffice from '@pages/Backoffice';
import Error404 from '@pages/Error404';
import RetreatLocation from '@pages/RetreatLocation';
import RetreatPayment from '@pages/RetreatPayment';
import RetreatApplicaion from '@pages/RetreatApplication';
import Maintenance from '@pages/Maintenance';
import Profile from '@pages/Profile';
import PrivateRoute from '@utils/PrivateRoute';
import { useEffect } from 'react';
import { requestAuthCheck } from './apis';
import { isLoadingState, userState } from '@modules/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import NotLogin from '@pages/NotLogin';
import Spinner from '@components/Spinner';
import RetreatAppInfo from '@pages/RetreatAppInfo';
import AuthUser from '@pages/AuthUser';
import MyPage from '@pages/MyPage';
import Youtube from '@pages/Youtube';
import YoutubeOld from '@pages/YoutubeOld';
import TimeTable from '@pages/TimeTable';
import PrayTalk from '@pages/PrayTalk';
import HolydayPass from '@pages/HolydayPass';
import RetreatList from '@pages/RetreatList';
import ResetPassword from '@pages/ResetPassword';
import CarpoolDownload from '@pages/CarpoolDownload';
import Support from '@pages/Support';
import Winter26ApplicationView from '@pages/Winter26Application/Winter26ApplicationView';

const App = () => {
  const setUser = useSetRecoilState(userState);
  const isLoading = useRecoilState(isLoadingState);

  useEffect(() => {
    if (window.location.pathname === '/maintenance') return;
    handleAuthCheck();
  }, []);

  const handleAuthCheck = async () => {
    const accessToken = await localStorage.getItem('access_token');
    const refreshToken = await localStorage.getItem('refresh_token');

    requestAuthCheck(accessToken, refreshToken)
      .then((res) => {
        if (!res?.data?.user) return;
        setUser({
          id: res.data.user.id,
          userId: res.data.user.userId,
          rank: res.data.user.rank,
          password: res.data.user.password,
          name: res.data.user.name,
          group: res.data.user.group,
          phone: res.data.user.phone,
          birth: res.data.user.birth,
          gender: res.data.user.gender,
        });
        if (window.location.pathname == '/') window.location.href = '/home';
      })
      .catch(async (err) => {
        setUser({
          id: null,
          userId: '',
          rank: 'M',
          password: '',
          name: '',
          group: '',
          phone: '',
          birth: '',
          gender: '',
        });
        if (!err.response || !err.response.data) return console.log('An unexpected error occurred:', err);
        if (err.response.data.message === 'Token not exist') return;
        if (err.response.data.message === 'Unauthorized user') return alert('로그인이 필요합니다.');
      });
  };

  return (
    <BrowserRouter>
      {isLoading[0].isLoading && <Spinner />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={`/${Page.register}`} element={<Register />} />
        <Route path={`/${Page.notLogin}`} element={<NotLogin />} />
        <Route path={`/${Page.resetPassword}`} element={<ResetPassword />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route element={<PrivateRoute />}>
          <Route path={`/${Page.home}`} element={<Home />} />
          <Route path={`/${Page.carpoolDownload}`} element={<CarpoolDownload />} />
          <Route path={`/${Page.retreatInfo}`} element={<RetreatInfo />} />
          <Route path={`/${Page.retreatLocation}`} element={<RetreatLocation />} />
          <Route path={`/${Page.retreatPayment}`} element={<RetreatPayment />} />
          <Route path={`/${Page.retreatApplication}`} element={<RetreatApplicaion />} />
          <Route path={`/${Page.backoffice}`} element={<Backoffice />} />
          <Route path={`/${Page.editProfile}`} element={<Profile />} />
          <Route path={`/${Page.retreatAppInfo}`} element={<RetreatAppInfo />} />
          <Route path={`/${Page.AuthUser}`} element={<AuthUser />} />
          <Route path={`/${Page.myPage}`} element={<MyPage />} />
          <Route path={`/${Page.youtube}`} element={<Youtube />} />
          <Route path={`/${Page.youtubeOld}`} element={<YoutubeOld />} />
          <Route path={`/${Page.timeTable}`} element={<TimeTable />} />
          <Route path={`/${Page.prayTalk}`} element={<PrayTalk />} />
          <Route path={`/${Page.holydayPass}`} element={<HolydayPass />} />
          <Route path={`/${Page.winter26Application}`} element={<Winter26ApplicationView />} />
          <Route path={`/${Page.retreatList}`} element={<RetreatList />} />
          <Route path={`/${Page.support}`} element={<Support />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
