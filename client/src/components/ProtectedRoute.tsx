import { Navigate } from 'react-router';
import { ProtectedRouteProps } from '../interfaces/protectedRouteProps';

function ProtectedRoute(props: ProtectedRouteProps) {
  if (
    localStorage.getItem('xpensr-user') &&
    localStorage.getItem('xpensr-token')
  ) {
    return <>{props.children}</>;
  } else {
    return <Navigate to='/login' />;
  }
}

export default ProtectedRoute;
