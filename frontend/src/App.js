import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root.js';
import ChronoBug from './pages/ChronoBugPage.js';
import Services from './pages/ServicesPage.js';
import Blog from './pages/BlogPage.js';
import Home from './pages/HomePage.js';
import SecondNavBarRoot from './pages/SecondNavBarRootPage.js';

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
            element: <Home />,
          },
        ],
      },
      {
        path: '/chronobug',
        element: <ChronoBug />,
      },
      { path: '/services', element: <Services /> },
      { path: '/blog', element: <Blog /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
