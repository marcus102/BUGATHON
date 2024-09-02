import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root.js';
import ChronoBug from './pages/ChronoBugPage.js';
import Services from './pages/ServicesPage.js';
import Blog from './pages/BlogPage.js';
import HomePage, { loader as homeLoader } from './pages/HomePage.js';
import SettingsPage, { action as settingsAction } from './pages/SettingsPage.js';
import ProfilePage from './pages/Profile.js';
import ExpandedCardView from './pages/ExpandedCardView.js';
import CreatePage, { action as createAction, loader as createLoader } from './pages/CreatePage.js';
import SecondNavBarRoot from './pages/SecondNavBarRootPage.js';
import AuthenticationPage, { action as authAction } from './pages/AuthenticationPage.js';
import { tokenLoader, fetchDataLoader } from './utils/authSection.js';
import Error from './pages/ErrorPage.js';

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
            loader: homeLoader,
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
      { 
        path: 'services', 
        element: <Services /> 
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'new',
        element: <CreatePage />,
        action: createAction,
        loader: createLoader,
      },
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

export function action({ request }) {}
