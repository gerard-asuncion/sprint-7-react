import { useEffect } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const useAuthRedirect = () => {
  const { session } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/', { replace: true });
    }
  }, [session, navigate]);
};

export default useAuthRedirect;
