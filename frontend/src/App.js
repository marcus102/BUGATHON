import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root.js';
import ChronoBug from './pages/ChronoBugPage.js';
import Services from './pages/ServicesPage.js';
import Blog from './pages/BlogPage.js';
import HomePage from './pages/HomePage.js';
import SettingsPage from './pages/SettingsPage.js';
import ProfilePage from './pages/ProfilePageCmp.js';
import ExpandedHomePage from './pages/ExpandedHome.js';
import CreatePage from './pages/CreatePage.js';
import SecondNavBarRoot from './pages/SecondNavBarRootPage.js';
import AuthenticationPage from './pages/AuthenticationPage.js';

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
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
          {
            path: '/detail/:postId',
            element: <ExpandedHomePage />,
          },
        ],
      },
      {
        path: '/chronobug',
        element: <ChronoBug />,
      },
      { path: '/services', element: <Services /> },
      { path: '/blog', element: <Blog /> },
      { path: '/new/:postTypeId', element: <CreatePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthenticationPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
