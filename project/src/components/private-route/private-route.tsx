import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import AuthStatus from '../../types/auth-status.enum';

type PrivateRouteProps = {
  children: JSX.Element,
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  return (authStatus === AuthStatus.Authorized ? props.children : <Navigate to={'/login'}></Navigate>);
}
