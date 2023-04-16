import { createBrowserRouter } from 'react-router-dom'

import Login from './pages/login'
import Home from './pages/home'
import SearchGames, { loader as gamesLoader } from './pages/searchGames'
import SearchGameDefault from './pages/searchGameDefault'
import Game, { loader as gameLoader } from './pages/game'
import ErrorPage from './pages/error-page'
import CreateAccount from './pages/createAccount'
import PasswordReset from './pages/passwordReset'
import UpdatePassword from './pages/updatePassword'
import AuthRoute from './components/AuthRoute'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/games',
    element: <AuthRoute><SearchGames /></AuthRoute>,
    loader: gamesLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <SearchGameDefault /> },
          {
            path: ":gameId",
            element: <Game />,
            loader: gameLoader
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
    errorElement: <ErrorPage />
  },
  {
    path: '/password-reset',
    element: <PasswordReset />,
    errorElement: <ErrorPage />
  },
  {
    path: '/update-password',
    element: <UpdatePassword />,
    errorElement: <ErrorPage />
  }
])
