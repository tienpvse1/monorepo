/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { UnauthorizePage } from './unauthorize';

interface ErrorPageProps {
  error: any;
}
export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  console.log(error);
  if (error.message == 'Unauthorize') return <UnauthorizePage />;
  else return <Navigate to={'/login'} />;
};
