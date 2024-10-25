import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
//20241025 
import ProtectedRoute from './ProtectedRoute';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login',
      // element: <AuthLogin3 />
      //20241025 
      element: <ProtectedRoute element={<AuthLogin3 />} requireAuth={false} /> // Halaman login
    },
    {
      path: '/pages/register/register3',
      // element: <AuthRegister3 />
      //20241025 
      element: <ProtectedRoute element={<AuthRegister3 />} requireAuth={false} />
    }
  ]
};

export default AuthenticationRoutes;
