import "./reset.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./global.css";

function App() {
const [auth, setAuth] = useState({
  isLogged: false,
  user: null,
  token: null,
});
  const [admin] = useState(false);
  const [updateEvents, setUpdateEvents] = useState(false);
  const [updateCrews, setUpdateCrews] = useState(false);

  return (
    <>
      <NavBar auth={auth} setAuth={setAuth} />
      <Outlet
        context={{
          auth,
          setAuth,
          admin,
          updateCrews,
          setUpdateCrews,
          updateEvents,
          setUpdateEvents,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
