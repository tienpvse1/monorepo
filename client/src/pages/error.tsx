/* eslint-disable react/prop-types */

interface ErrorPageProps {
  error: any;
}
export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  // if (error.message == 'Unauthorize') return <UnauthorizePage />;
  // return <Navigate to={'/login'} />;
  console.log(error);
  return <h1>Error</h1>;
};
