import { supabase } from '../providers/AuthProvider';
import { Auth } from '@supabase/auth-ui-react';

function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5">

      <div className="w-full max-w-xl">
        <Auth
          supabaseClient={supabase}
					providers={[]}
          magicLink
          appearance={{
            extend: false,
            className: {
              // Tarjeta principal con fondo azul oscuro
							container: 'bg-blue-950 p-4 rounded-xl m-2 flex flex-col items-center gap-4',

							// Botón principal con alto contraste: fondo claro y texto oscuro
							button: 'bg-gray-100 text-blue-950 font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-opacity',

							// Campos de texto con fondo transparente y borde claro
							input: 'bg-transparent border border-gray-100 text-gray-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 w-full',

							// Etiquetas de texto claras
							label: 'text-gray-100 text-sm font-medium text-left opacity-80',

							// Enlaces claros y subrayados al pasar el cursor
							anchor: 'text-gray-100 hover:underline text-sm mr-2',

							// Mensajes de error, usando los colores disponibles
							message: 'text-gray-100 font-bold text-sm text-center',

							// Línea divisora sutil
							divider: 'bg-gray-100 bg-opacity-25',
            },
          }}
        />
      </div>

    </div>
  );
}

export default LoginPage;
