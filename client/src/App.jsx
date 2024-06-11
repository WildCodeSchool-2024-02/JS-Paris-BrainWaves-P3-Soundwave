import "./reset.css";

import "./global.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default App;
