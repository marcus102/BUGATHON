import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root.js';
import ChronoBug from './pages/ChronoBugPage.js';
import Services from './pages/ServicesPage.js';
import Blog from './pages/BlogPage.js';
import HomePage, { loader as homeLoader, action as homeAction } from './pages/HomePage.js';
import SettingsPage, { action as settingsAction, loader as settingsLoader } from './pages/SettingsPage.js';
import ProfilePage, { loader as profileLoader } from './pages/Profile.js';
import ExpandedCardView, { loader as expandedLoader } from './pages/ExpandedCardView.js';
import CreatePage, { action as createAction, loader as createLoader } from './pages/CreatePage.js';
import SecondNavBarRoot from './pages/SecondNavBarRootPage.js';
import AuthenticationPage, { action as authAction } from './pages/AuthenticationPage.js';
import CommentsPage, {
  loader as commentLoader,
  action as commentAction,
} from './pages/CommentsPage.js';
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
    errorElement: <Error />,
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
            action: homeAction,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
            loader: profileLoader,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
            action: settingsAction,
            loader: settingsLoader,
          },
          {
            path: 'detail',
            element: <ExpandedCardView />,
            loader: expandedLoader,
          },
          {
            path: 'comments',
            element: <CommentsPage />,
            action: commentAction,
            loader: commentLoader,
          },
        ],
      },
      {
        path: '/chronobug',
        element: <ChronoBug />,
      },
      {
        path: 'services',
        element: <Services />,
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
    errorElement: <Error />,
    action: authAction,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;

export function action({ request }) {}
