import { UnauthorizePage } from "./unauthorize";

interface ErrorPageProps {
  error: any;
}
export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {  
  if (error.message == 'Unauthorize')
    return <UnauthorizePage />;
  else
    return <div>Error occur</div>;
};
