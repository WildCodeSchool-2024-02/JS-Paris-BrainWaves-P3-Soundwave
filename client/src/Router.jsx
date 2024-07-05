import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import EventsList from "./pages/EventList/EventsList";
import EventDetails from "./pages/EventDetails/EventDetails";
import CrewsList from "./pages/CrewsList/CrewsList";
import CrewProfile from "./pages/CrewProfile/CrewProfile";
import Admin from "./pages/Admin/Admin";
import UserProfile from "./pages/UserProfile/UserProfile";
import CrewCreation from "./pages/CrewCreation/CrewCreation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/events/recent`),
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
        element: <CrewProfile />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/crews/${params.id}`),
      },
      {
        path: "/crew-creation/:id",
        element: <CrewCreation />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/user-profile/:id",
        element: <UserProfile />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/users/${params.id}`),
      },
    ],
  },
]);

export default router;
