/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

interface ErrorPageProps {
  error: any;
}
export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  // if (error.message == 'Unauthorize') return <UnauthorizePage />;
  // return <Navigate to={'/login'} />;
  return <h1>Error</h1>;
};
