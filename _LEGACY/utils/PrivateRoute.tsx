import { userState } from "@modules/atoms";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

const PrivateRoute = () => {
  const isLogin = useRecoilState(userState);
  return isLogin[0].userId ? <Outlet /> : <Navigate to="/not-login" />;
};

export default PrivateRoute;