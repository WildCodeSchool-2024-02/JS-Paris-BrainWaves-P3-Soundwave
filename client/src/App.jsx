import "./reset.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "./global.css";

function App() {
  const [auth, setAuth] = useState({
    isLogged: false,
    user: null,
    token: null,
  });
  const [updateEvents, setUpdateEvents] = useState(false);
  const [updateCrews, setUpdateCrews] = useState(false);
  const [styleInput, setStyleInput] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/refresh`,
          { credentials: "include" }
        );
        if (response.ok) {
          const token = response.headers.get("Authorization");
          const user = await response.json();
          setAuth({ isLogged: true, user, token });
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("une erreur est survenue");
        setIsLoading(false);
      }
    };
    getAuth();
  }, []);

  return (
    <>
      <NavBar auth={auth} setAuth={setAuth} />
      <ToastContainer theme="dark"/>
      <Outlet
        context={{
          auth,
          setAuth,
          updateCrews,
          setUpdateCrews,
          updateEvents,
          setUpdateEvents,
          isLoading,
          styleInput,
          setStyleInput,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
