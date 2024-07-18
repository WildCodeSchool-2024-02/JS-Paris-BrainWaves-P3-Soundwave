import {
  createBrowserRouter,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useEffect } from "react";
import App from "./App";
import Home from "./pages/Home/Home";
import EventsList from "./pages/EventList/EventsList";
import EventDetails from "./pages/EventDetails/EventDetails";
import CrewsList from "./pages/CrewsList/CrewsList";
import CrewProfile from "./pages/CrewProfile/CrewProfile";
import Admin from "./pages/Admin/Admin";
import UserProfile from "./pages/UserProfile/UserProfile";
import CrewCreation from "./pages/CrewCreation/CrewCreation";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";

const AdminRoute = ({ children }) => {
  const { auth, isLoading } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!auth.isLogged) {
        navigate("/");
      }
    }
  }, [auth, isLoading, navigate]);
  if (!isLoading && auth.isLogged && auth.user.role === "admin") {
    return children;
  }
  return "...loading";
};

const ClientRoute = ({ children }) => {
  const { auth, isLoading } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!auth.isLogged) {
        navigate("/");
      }
    }
  }, [auth, isLoading, navigate]);
  if (!isLoading && auth.isLogged && auth.user.role === "client") {
    return children;
  }
  return "...loading";
};

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
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <ClientRoute>
            <UserProfile />
          </ClientRoute>
        ),
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
    ],
  },
]);

export default router;
