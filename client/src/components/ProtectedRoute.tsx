import { Navigate } from 'react-router';
import { ProtectedRouteProps } from '../interfaces/protectedRouteProps';

function ProtectedRoute(props: ProtectedRouteProps) {
  if (localStorage.getItem('xpensr-user')) {
    return <>{props.children}</>;
  } else {
    return <Navigate to='/login' />;
  }
}

export default ProtectedRoute;
