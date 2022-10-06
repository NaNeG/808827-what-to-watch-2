import {Navigate} from 'react-router-dom';
import AuthStatus from '../../types/AuthStatus.enum';

type PrivateRouteProps = {
  authStatus: AuthStatus,
  children: JSX.Element,
}

export default function PrivateRoute(props: PrivateRouteProps) {
  return (props.authStatus === AuthStatus.Authorized ? props.children : <Navigate to={'/login'}></Navigate>);
}
