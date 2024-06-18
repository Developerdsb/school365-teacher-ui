import React, { lazy } from 'react';
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const Login = Loadable(lazy(() => import('../views/pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/pages/authentication/Register')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'sign-in',
      element: <Login />
    },
    {
      path: 'sign-up',
      element: <Register />
    }
  ]
};

export default AuthenticationRoutes;
