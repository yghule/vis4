import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_HISTORY } from "../store";

export default function ResultBar() {
  const dispatch = useDispatch();
  const count = useSelector((s) => s.count);
  const history = useSelector((s) => s.history);

  // Derive operation counts
  const { additions, subtractions } = useMemo(() => {
    let adds = 0, subs = 0;
    for (const h of history) {
      if (h === "Reset") continue;
      if (h.startsWith("+")) adds++;
      if (h.startsWith("-")) subs++;
    }
    return { additions: adds, subtractions: subs };
  }, [history]);

  // Status message 
  const totalMessage =
    count > 0 ? "The total is positive." :
    count < 0 ? "The total is negative." :
    "The total is zero.";

  // Background color for result box
  const resultBg =
    count > 0 ? "lightgreen" :
    count < 0 ? "lightcoral" :
    "white";

  return (
    <aside id="sidebar">
      <h3>RESULT</h3>
      <p id="resultId" style={{ background: resultBg, transition: "background .3s ease" }}>{count}</p>

      <h3>Summary</h3>
      <div id="summary">
        {/* Line break structure */}
        Total additions: {additions},<br /> Total subtractions: {subtractions}
      </div>

      <h3>Status</h3>
      <div id="totalMessage">{totalMessage}</div>

      <h3>History (click an item to remove it)</h3>
      {history.length === 0 ? (
        <p className="muted">Empty.</p>
      ) : (
        <ul id="historyList">
          {history.map((item, idx) => (
            <li
              key={idx}
              onClick={() => dispatch({ type: UPDATE_HISTORY, payload: idx })}
              title="Click to remove"
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
