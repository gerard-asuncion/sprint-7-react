import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../providers/AuthProvider';
import useAuthRedirect from '../hooks/useAuthRedirect';

function LoginPage() {

  useAuthRedirect();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            extend: false,
            className: {
              container: 'bg-blue-950 p-8 rounded-xl flex flex-col items-center gap-4',
              button: 'bg-gray-100 text-blue-950 font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-opacity',
              input: 'bg-blue-900 border border-blue-700 text-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100 w-full transition-colors',
              label: 'text-gray-100 text-sm font-medium text-left opacity-80 w-full',
              anchor: 'text-gray-100 hover:underline text-sm',
              message: 'text-gray-100 font-bold text-sm text-center',
              divider: 'bg-gray-100 bg-opacity-25 w-full',
            },
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
