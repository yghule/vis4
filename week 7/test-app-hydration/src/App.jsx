import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Summary from "./pages/Summary.jsx";
import Mix from "./pages/Mix.jsx";
import LiveRun from "./pages/LiveRun.jsx";
import "./styles.css";
import homeIcon from "./assets/icons/home.png";
import mixIcon from "./assets/icons/mix.png";
import runIcon from "./assets/icons/run.png";

/* App shell and routing setup */
export default function App(){
  const location = useLocation();
  const navigate = useNavigate();

  /* Bottom nav config */
  const nav = [
    { to: "/", label: "home", icon: homeIcon },
    { to: "/live", label: "run", icon: runIcon },
    { to: "/mix", label: "mix", icon: mixIcon },
  ];

  return (
    <div className="app-shell">
      <div className="screen">
        {/* Page routes */}
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/mix" element={<Mix />} />
          <Route path="/live" element={<LiveRun />} />
        </Routes>

        {/* Bottom navigation bar */}
        <div className="bottom-bar">
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}
            >
              <img src={n.icon} alt={n.label} style={{ width: 26, height: 26 }} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
