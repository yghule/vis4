import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import Home from "./Home.jsx";
import LiveRun from "./LiveRun.jsx";
import Controls from "./Controls.jsx";
import homeiconPng from "./Assets/Home Icon.png";
import liverunPng from "./Assets/LiveRun Icon.png";
import controlsPng from "./Assets/Controls Icon.png";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LiveRun" element={<LiveRun />} />
            <Route path="/Controls" element={<Controls />} />
          </Routes>  
          {/*<Home />
          <LiveRun />
          <Controls />*/}
        </header>
      </div>
      <nav className="navigation">
        <li><Link to="/"><img src={homeiconPng} alt="Home Icon" /></Link></li>
        <li><Link to="/LiveRun"><img src={liverunPng} alt="LiveRun Icon" /></Link></li>
        <li><Link to="/Controls"><img src={controlsPng} alt="Controls Icon" /></Link></li>
      </nav>  
    </Router>
  );
}

export default App;
