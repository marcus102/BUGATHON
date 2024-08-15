import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root.js';
import ChronoBug from './pages/ChronoBugPage.js';
import Services from './pages/ServicesPage.js';
import Blog from './pages/BlogPage.js';
import HomePage from './pages/HomePage.js';
import SettingsPage, { action as settingsAction } from './pages/SettingsPage.js';
import ProfilePage from './pages/ProfilePageCmp.js';
import ExpandedCardView, { action as expandedCardViewAction } from './pages/ExpandedCardView.js';
import CreatePage from './pages/CreatePage.js';
import ContributionPage from './pages/ContributionPage.js';
import SecondNavBarRoot from './pages/SecondNavBarRootPage.js';
import AuthenticationPage, { action as authAction } from './pages/AuthenticationPage.js';
import { tokenLoader, checkAuthLoader } from './utils/authSection.js';
import Error from './pages/ErrorPage.js';
import { fetchDataLoader } from './utils/authSection.js';

async function combinedLoader() {
  const tokenData = await tokenLoader();
  const fetchData = await fetchDataLoader();

  return {
    tokenData,
    fetchData,
  };
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <Error />,
    id: 'root',
    loader: combinedLoader,
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
            action: settingsAction,
          },
          {
            path: 'detail',
            element: <ExpandedCardView />,
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
