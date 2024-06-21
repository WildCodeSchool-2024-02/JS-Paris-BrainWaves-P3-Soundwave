import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import EventsList from "./pages/EventList/EventsList";
import EventDetails from "./pages/EventDetails";
import CrewsList from "./pages/CrewsList/CrewsList";
import CrewProfil from "./pages/CrewProfile/CrewProfile";
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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/events`),
      },
      {
        path: "/events-list",
        element: <EventsList />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/events`),
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/events/${params.id}`),
      },
      {
        path: "/crews-list",
        element: <CrewsList />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/crews`),
      },
      {
        path: "/crew-details/:id",
        element: <CrewProfil />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/crews/${params.id}`),
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
