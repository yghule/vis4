import React from "react";
import { useDispatch } from "react-redux";
import { ADD_1, ADD_2, REMOVE_1, REMOVE_2, RESET, CLEAR_ALL } from "../store";

export default function ControlCenter() {
  const dispatch = useDispatch();

  return (
    <main id="main-content" className="bucket bolded">
      <h3>Control Center</h3>
      <div className="controls">
        <button id="btnMinus2" onClick={() => dispatch({ type: REMOVE_2 })}>-2</button>
        <button id="btnMinus1" onClick={() => dispatch({ type: REMOVE_1 })}>-1</button>
        <button id="btnReset"  onClick={() => dispatch({ type: RESET })}>Reset</button>
        <button id="btnPlus1"  onClick={() => dispatch({ type: ADD_1 })}>+1</button>
        <button id="btnPlus2"  onClick={() => dispatch({ type: ADD_2 })}>+2</button>
      </div>

      <button
        id="clearAllBtn"
        style={{ marginTop: 16 }}
        onClick={() => dispatch({ type: CLEAR_ALL })}
      >
        Clear History & Results
      </button>
    </main>
  );
}
