import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";
import CrewsList from "./pages/CrewsList/CrewsList";
import CrewProfil from "./pages/CrewProfil";
import Admin from "./pages/Admin";
import UserProfil from "./pages/UserProfil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events-list",
        element: <EventsList />,
      },
      {
        path: "/event-details",
        element: <EventDetails />,
      },
      {
        path: "/crews-list",
        element: <CrewsList />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/crews`),
      },
      {
        path: "/crew-details/:id",
        element: <CrewProfil />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/user-profil",
        element: <UserProfil />,
      },
    ],
  },
]);

export default router;
