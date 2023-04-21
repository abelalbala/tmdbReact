import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {TokenContext, Context} from './Context';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Lists from './pages/Lists';
import Search from './pages/Search';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MovieDetail from './pages/MovieDetail';

const router = createBrowserRouter([
  { path: "/",
    element: <App/> },
  { path: "lists",
    element: <Lists/> },
  { path: "search",
    element: <Search/> },
  { path: "login",
  element: <Login/> },
  { path: "logout",
  element: <Logout/> },
  {path: "movie-detail/:id",
    element: <MovieDetail/> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </React.StrictMode>
);


