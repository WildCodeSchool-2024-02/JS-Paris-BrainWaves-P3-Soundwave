import "./reset.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./global.css";

function App() {
  const [dataUser, setDataUser] = useState({});

  return (
    <>
      <NavBar setDataUser={setDataUser} />
      <main className="container">
        <Outlet context={{ dataUser, setDataUser }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
