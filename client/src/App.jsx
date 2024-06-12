import "./reset.css";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";

import "./global.css";

function App() {
  return (
    <>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
