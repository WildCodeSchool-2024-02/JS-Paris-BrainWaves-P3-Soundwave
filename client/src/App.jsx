import "./reset.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import Footer from "./components/Footer/Footer";

import "./global.css";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
