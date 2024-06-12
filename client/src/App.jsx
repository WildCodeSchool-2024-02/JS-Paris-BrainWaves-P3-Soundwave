import "./reset.css";

import "./global.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
