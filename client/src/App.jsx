import "./reset.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./global.css";

function App() {
  const [auth, setAuth] = useState({
    isLogged: false,
    user: null,
    token: null,
    crew: null
  });
  const [updateEvents, setUpdateEvents] = useState(false);
  const [updateCrews, setUpdateCrews] = useState(false);
  const [styleInput, setStyleInput] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventLike, setEventLike] = useState([]);



  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/refresh`,
          { credentials: "include" }
        );
        if (response.ok) {
          const token = response.headers.get("Authorization");
          const result = await response.json();
          
          setAuth({
            isLogged: true,
            user: result.user,
            token,
            crew: result.crew
          });
          setEventLike(result.likeEvent);
          setIsLoading(false);
        } else {
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
      <ToastContainer theme="dark" />
      <NavBar auth={auth} setAuth={setAuth} />
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
          eventLike, 
          setEventLike,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
