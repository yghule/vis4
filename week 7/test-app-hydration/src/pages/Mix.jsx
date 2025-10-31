import { useState } from "react";
import { TopRow, Toggle } from "../components/Ui.jsx";

export default function Mix() {
  const [reminders, setReminders] = useState(true);
  const [mixPercent, setMixPercent] = useState(20); // starts at 20%

  return (
    <>
      <TopRow />

      {/* Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="h1">Mix & Reminders</div>
      </div>
      <div className="sub" style={{ marginBottom: 8 }}>
        Personalized from last 3 runs
      </div>

      {/* Reminder toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div className="sub" style={{ marginLeft: 240, fontSize: 17 }}>
          Reminders
        </div>
        <Toggle on={reminders} setOn={setReminders} />
      </div>

      {/* Stat cards */}
      <div className="row" style={{ gap: 14, marginBottom: 14 }}>
        <div className="card mint pad" style={{ flex: 1, height: 220 }}>
          <div className="sub">
            Average <br /> Sweat Loss
          </div>
          <div style={{ marginTop: 2, fontSize: 34, fontWeight: 700 }}>
            0.7 L/hr
          </div>
          <button
            className="btn black"
            style={{
              marginTop: 65,
              marginLeft: 115,
              width: 42,
              height: 42,
              borderRadius: 999,
            }}
          >
            ＋
          </button>
        </div>

        <div className="card sky pad" style={{ flex: 1, height: 220 }}>
          <div className="sub">
            Hydration <br /> Consistency
          </div>
          <div style={{ marginTop: 2, fontSize: 34, fontWeight: 700 }}>
            85%
          </div>
          <button
            className="btn black"
            style={{
              marginTop: 65,
              marginLeft: 115,
              width: 42,
              height: 42,
              borderRadius: 999,
            }}
          >
            ＋
          </button>
        </div>
      </div>

      {/* Electrolyte mix slider */}
      <div className="card dark pad" style={{ borderRadius: "28px" }}>
        <div className="sub" style={{ color: "#e2e8ec" }}>
          Electrolyte Mix
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1 }}>
          {mixPercent}%
        </div>
        <div
          className="sub"
          style={{
            color: "#8a8a8a",
            marginBottom: 6,
            marginTop: 16,
          }}
        >
          60% Recommended
        </div>

        {/* Slider pill with dots */}
        <div className="slider-pill">
          <input
            className={"slider" + (mixPercent === 60 ? " onRecommended" : "")}
            type="range"
            min={0}
            max={80}
            step={20}
            value={mixPercent}
            onChange={(e) => setMixPercent(Number(e.target.value))}
            aria-label="Electrolyte mix percentage"
          />

          {/* Position dots */}
          <div className="slider-dots" aria-hidden>
            {[0, 20, 40, 60, 80].map((v) => (
              <span
                key={v}
                className={
                  "slider-dot" +
                  (v <= mixPercent ? " active" : "") +
                  (v === 60 ? " recommended" : "")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
