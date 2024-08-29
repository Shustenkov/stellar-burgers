import { Navigate, useLocation } from 'react-router-dom';
import {
  getUserLoginRequestSelector,
  getUserSelector
} from '../../services/slices/user';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const loginUserRequest = useSelector(getUserLoginRequestSelector);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (loginUserRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const fromLocation = location.state?.from || { pathname: '/' };
    return <Navigate replace to={fromLocation} />;
  }

  return children;
};
