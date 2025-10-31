import { useState, useEffect, useRef } from "react";
import { TopRow, Gauge, MiniStat } from "../components/Ui.jsx";
import "../styles.css";
import distanceIcon from "../assets/icons/distance.png";
import sweatWhiteIcon from "../assets/icons/sweat white.png";
import speedIcon from "../assets/icons/speed.png";

export default function LiveRun() {
  const TARGET_PCT = 76;

  // states
  const [pct, setPct] = useState(0);
  const [timer, setTimer] = useState(10);
  const [locked, setLocked] = useState(true);
  const [textColor, setTextColor] = useState("#111");
  const [dragging, setDragging] = useState(false);
  const [posPx, setPosPx] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const trackRef = useRef(null);

  const KNOB = 56;

  /* Gauge animation */
  useEffect(() => {
    let rafId;
    const duration = 2500;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = ease(p);
      setPct(Math.round(TARGET_PCT * eased));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* Timer countdown */
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else setLocked(false);
  }, [timer]);

  const progressWidth = locked ? (timer / 10) * 100 : 0;
  useEffect(() => {
    setTextColor(progressWidth < 50 ? "rgba(255,255,255,0.6)" : "#111");
  }, [progressWidth]);

  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  /* Drag logic for pill slider */
  const onPointerMove = (e) => {
    if (!dragging || locked || confirmed) return;
    const rect = trackRef.current.getBoundingClientRect();
    const travel = rect.width - KNOB;
    const x = Math.min(Math.max(e.clientX - rect.left - KNOB / 2, 0), travel);
    setPosPx(x);

    if (x >= travel) {
      setConfirmed(true);
      setDragging(false);
      setTimeout(() => {
        setConfirmed(false);
        setPosPx(0);
      }, 1500);
    }
  };

  return (
    <>
      <TopRow />

      {/* Header */}
      <div className="row" style={{ gap: 12, marginBottom: 8 }}>
        <div className="h1">Live Run</div>
      </div>

      {/* Connection status */}
      <div
        className="chip"
        style={{
          width: "fit-content",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          background: "#000",
          color: "#fff",
          fontWeight: 400,
          fontSize: 12,
          marginBottom: "24px",
        }}
      >
        <span className="status-dot" />
        <span>Connected</span>
      </div>

      {/* Hydration gauge */}
      <div style={{ marginBottom: "48px" }}>
        <Gauge percent={pct} label={`${pct}%`} sub="Mild Dehydration" />
      </div>

      {/* Electrolyte mix pill */}
      <div className="card dark pad" style={{ borderRadius: "28px", marginTop: 8 }}>
        <div
          ref={trackRef}
          onPointerMove={onPointerMove}
          onPointerUp={() => setDragging(false)}
          style={{
            position: "relative",
            width: "100%",
            height: 74,
            borderRadius: 36,
            background: "#2A2F33",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Timer / fill state */}
          {locked && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 8,
                  right: 8,
                  top: 8,
                  bottom: 8,
                  background: "#1E2327",
                  borderRadius: 28,
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progressWidth}%`,
                    background: "#4DB2FF",
                    borderRadius: 28,
                    transition: "width 1s linear",
                  }}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  fontSize: 22,
                  fontWeight: 700,
                  color: textColor,
                  zIndex: 2,
                  transition: "color 0.3s ease",
                }}
              >
                {mm}:{ss}
              </div>
            </>
          )}

          {/* Slider unlocked */}
          {!locked && !confirmed && (
            <>
              <div
                onPointerDown={(e) => {
                  setDragging(true);
                  e.currentTarget.setPointerCapture?.(e.pointerId);
                }}
                onPointerUp={(e) => {
                  setDragging(false);
                  e.currentTarget.releasePointerCapture?.(e.pointerId);
                }}
                style={{
                  position: "absolute",
                  marginLeft: 8,
                  left: posPx,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: KNOB,
                  height: KNOB,
                  borderRadius: "50%",
                  background: "#8EE39C",
                  color: "#111",
                  fontWeight: 700,
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "grab",
                  userSelect: "none",
                  touchAction: "none",
                  zIndex: 2,
                  willChange: "left",
                  transition: dragging ? "none" : "left 120ms ease-out",
                }}
              >
                ➤
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                  color: "#FFF",
                  fontSize: 12,
                  fontWeight: 500,
                  opacity: 0.5,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                60% electrolytes (recommended)
              </div>
            </>
          )}

          {/* Confirmation state */}
          {confirmed && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#8EE39C",
                color: "#111",
                fontWeight: 700,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 36,
                zIndex: 3,
              }}
            >
              ✓ Change Confirmed
            </div>
          )}
        </div>

        {/* Bottom stats */}
        <div
          className="row"
          style={{
            fontSize: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            marginTop: 18,
            width: "100%",
          }}
        >
          <MiniStat
            icon={<img src={distanceIcon} alt="Distance" style={{ width: 16, height: 16, objectFit: "contain" }} />}
            label="2.6 MI"
          />
          <MiniStat
            icon={<img src={sweatWhiteIcon} alt="Sweat" style={{ width: 14, height: 14, objectFit: "contain" }} />}
            label="0.68 L/hr"
          />
          <MiniStat
            icon={<img src={speedIcon} alt="Speed" style={{ width: 18, height: 18, objectFit: "contain" }} />}
            label="5.5 MPH"
          />
        </div>
      </div>
    </>
  );
}
