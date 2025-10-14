import React from "react";
import ControlCenter from "./Components/ControlCenter.jsx";
import ResultBar from "./Components/ResultBar.jsx";
import "./Styles/index.css";


export default function App() {
  return (
    <>
      {/* Header */}
      <header id="header">
        <div className="header-flex">
          <h1>Yash's Number Adder</h1>
          <h4>Item 1</h4>
          <h4>Item 2</h4>
          <h4>Item 3</h4>
        </div>
      </header>

      {/* Page wrapper (sidebar + main) */}
      <div className="page">
        <ResultBar />
        <ControlCenter />
      </div>
    </>
  );
}
