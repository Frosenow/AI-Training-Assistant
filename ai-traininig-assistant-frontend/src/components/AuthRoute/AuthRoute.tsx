import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

interface Props {
  children: React.ReactNode;
}

function AuthRoute({ children }: Props) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AuthRoute;
