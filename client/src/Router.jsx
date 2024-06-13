import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import EventsList from "./pages/EventList/EventsList";
import EventDetails from "./pages/EventDetails";
import CollectifsList from "./pages/CollectifsList";
import CollectifProfil from "./pages/CollectifProfil";
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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/events`),
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/events/${params.id}`),
      },
      {
        path: "/collectifs-list",
        element: <CollectifsList />,
      },
      {
        path: "/collectif-details",
        element: <CollectifProfil />,
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
