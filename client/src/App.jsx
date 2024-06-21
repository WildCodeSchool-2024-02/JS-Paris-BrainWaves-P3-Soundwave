import "./reset.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./global.css";

function App() {
  const [dataUser, setDataUser] = useState({});
  const [admin] = useState(false);
  const [updateEvents, setUpdateEvents] = useState(false);
  const [updateCrews, setUpdateCrews] = useState(false);

  return (
    <>
      <NavBar dataUser={dataUser} setDataUser={setDataUser} />
      <Outlet
        context={{
          dataUser,
          setDataUser,
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
