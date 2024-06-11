import "./reset.css";

import "./global.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
