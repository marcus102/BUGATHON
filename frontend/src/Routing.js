import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root.js';
import ChronoBug from './pages/ChronoBugPage.js';
import Services from './pages/ServicesPage.js';
import Blog from './pages/BlogPage.js';
import HomePage from './pages/HomePage.js';
import SettingsPage from './pages/SettingsPage.js';
import ProfilePage from './pages/ProfilePageCmp.js';
import ExpandedCardView, { action as expandedCardViewAction } from './pages/ExpandedCardView.js';
import CreatePage from './pages/CreatePage.js';
import SecondNavBarRoot from './pages/SecondNavBarRootPage.js';
import AuthenticationPage, { action as authAction } from './pages/AuthenticationPage.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SecondNavBarRoot />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: ':postId',
            element: <ExpandedCardView />,
            children: [
              {
                path: 'contribute',
                element: <CreatePage />
              },
            ],
          },
        ],
      },
      {
        path: '/chronobug',
        element: <ChronoBug />,
      },
      { path: 'services', element: <Services /> },
      { path: 'blog', element: <Blog /> },
      { path: 'new', element: <CreatePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthenticationPage />,
    action: authAction,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
