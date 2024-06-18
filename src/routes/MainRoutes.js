import React, { lazy, Suspense } from 'react';
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import TemplateIndex from '../views/dashboard/CreateYearBook/TemplateIndex';
import ProtectedRoute from './ProtectRoutes';
import AdminDashboard from '../views/AdminDashboard/index';
// const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/dashboard')));
const Teacher = Loadable(lazy(() => import('../views/dashboard/Teacher')));
const Students = Loadable(lazy(() => import('../views/dashboard/Students')));
const Gallery = Loadable(lazy(() => import('../views/dashboard/Gallery/index')));
const Templates = Loadable(lazy(() => import('../views/dashboard/Template/Templates')));
const ProfileUpdate = Loadable(lazy(() => import('../views/dashboard/Teacher/ProfileUpdate')));
const StudentProfileUpdate = Loadable(lazy(() => import('../views/dashboard/Students/ProfileUpdate')));
const SingleStudent = Loadable(lazy(() => import('../views/dashboard/Students/SingleStudent')));
import { ThreeDots } from 'react-loader-spinner';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: 'students',
      element: (
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      )
    },
    {
      path: 'students/:studentId',
      element: (
        <ProtectedRoute>
          <SingleStudent />
        </ProtectedRoute>
      )
    },
    {
      path: 'teacher',
      element: (
        <ProtectedRoute>
          <Teacher />
        </ProtectedRoute>
      )
    },
    {
      path: 'students/studentprofileupdate',
      element: (
        <ProtectedRoute>
          <StudentProfileUpdate />
        </ProtectedRoute>
      )
    },
    {
      path: 'profileupdate',
      element: <ProfileUpdate />
    },
    {
      path: 'gallery',
      element: <Gallery />
    },
    {
      path: 'templates',
      element: (
        <ProtectedRoute>
          <Suspense
            fallback={
              <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="#00ADEE"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                wrapperClass=""
              />
            }
          >
            <Templates />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: 'createyearbook',
      element: (
        <ProtectedRoute>
          <Suspense
            fallback={
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#00ADEE"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                wrapperClass=""
              />
            }
          >
            <TemplateIndex />
          </Suspense>
        </ProtectedRoute>
      )
    }

    // Add more routes as needed
  ]
};

export default MainRoutes;
