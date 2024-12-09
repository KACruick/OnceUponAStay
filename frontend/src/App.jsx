import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignupFormModal from './components/SignupFormModal/SignupFormModal.jsx';
import LoginFormModal from './components/LoginFormModal/LoginFormModal.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import * as sessionActions from './store/session.js';
import LandingPage from './components/LandingPage/Landing.jsx';
import { getSpots } from "./store/spots";
import BottomNav from './components/Navigation/BottomNav.jsx';
import SpotPage from './components/SpotPage/SpotPage.jsx';
import CreateSpot from './components/CreateSpot/CreateSpot.jsx';
import ManageSpots from './components/ManageSpots/ManageSpots.jsx';
import ManageReviews from './components/ManageReviews/ManageReviews.jsx';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      dispatch(getSpots());
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <BottomNav />
    </>
    
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: 'login',
        element: <LoginFormModal />
      },
      {
        path: 'signup',
        element: <SignupFormModal />
      },
      {
        path: "/api/spots", 
        element: <CreateSpot/>
      },
      {
        path: "api/spots/current",
        element: <ManageSpots />
      },
      {
        path: "/api/spots/:spotId",
        element: <SpotPage /> 
      },
      {
        path: "/api/spots/:spotId/edit",
        element: <CreateSpot/>
      },
      {
        path: "/api/reviews/current",
        element: <ManageReviews />
      },
      {
        path: '*',
        element: <h1>Page Not Found</h1>
      }

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;