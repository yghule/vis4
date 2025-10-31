import { useState, useEffect } from "react";
import { TopRow } from "../components/Ui.jsx";
import runner from "../assets/runner.png";
import tempIcon from "../assets/icons/temperature.png";
import sweatIcon from "../assets/icons/sweat.png";
import batteryIcon from "../assets/icons/battery.png";

export default function Summary() {
  const [level] = useState(82);
  const [fillWidth, setFillWidth] = useState(0); // hydration bar animation

  /* animate hydration bar on load */
  useEffect(() => {
    let start = null;
    const duration = 1500;
    const target = 78;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOut(progress);
      setFillWidth(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <>
      <TopRow />

      {/* Title + date */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="h1">Summary</div>
      </div>
      <div className="sub" style={{ marginBottom: 24 }}>
        Friday Oct 27
      </div>

      {/* top stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        {/* temp + sweat pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* temperature */}
          <div
            style={{
              marginTop: 10,
              height: 60,
              width: 120,
              background: "#E7ECEF",
              borderRadius: 999,
              padding: "8px 24px",
              fontSize: 14,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <img
              src={tempIcon}
              alt="Temperature"
              style={{ width: 18, height: 18, objectFit: "contain" }}
            />
            <span>32°C</span>
          </div>

          {/* sweat rate */}
          <div
            style={{
              marginTop: 10,
              height: 60,
              width: 120,
              background: "#E7ECEF",
              borderRadius: 999,
              padding: "8px 12px",
              fontSize: 14,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <img
              src={sweatIcon}
              alt="Sweat Rate"
              style={{ width: 16, height: 16, objectFit: "contain" }}
            />
            <span>0.68 L/hr</span>
          </div>
        </div>

        {/* battery pill */}
        <div
          style={{
            marginTop: 10,
            height: 60,
            width: 100,
            background: "#000",
            color: "#fff",
            borderRadius: 999,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <img
            src={batteryIcon}
            alt="Battery"
            style={{ width: 16, height: 16, objectFit: "contain" }}
          />
          <span>64%</span>
        </div>
      </div>

      {/* hydration level card */}
      <div
        style={{
          marginTop: 2,
          height: 180,
          background: "#686F72",
          borderRadius: 28,
          padding: "24px 22px",
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* hydration level + label */}
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#B5E3B0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 750,
              fontSize: 16,
              color: "#000",
            }}
          >
            {level}%
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              Hydration Level
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              Normal
            </div>
          </div>
        </div>

        {/* progress bar */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 50,
            borderRadius: 999,
            background: "#1F2225",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${fillWidth}%`,
              background: "#A7DAE6",
              borderRadius: 999,
              transition: "width 0.1s linear",
            }}
          />

          {/* white dots */}
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "88%",
              left: "6%",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#fff",
                  opacity: 0.9,
                }}
              />
            ))}
          </div>

          {/* right-end circle */}
          <div
            style={{
              position: "absolute",
              right: 0,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#1F2225",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>
      </div>

      {/* run metrics card */}
      <div
        style={{
          position: "relative",
          borderRadius: 28,
          background: "#C4EAC4",
          overflow: "hidden",
          height: 260,
          padding: "28px 28px 0",
          marginTop: 8,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 28, color: "#000" }}>
          Your Run Metrics
        </div>

        <img
          src={runner}
          alt="Runner"
          style={{
            position: "absolute",
            right: 10,
            bottom: 0,
            height: 210,
            width: "auto",
            objectFit: "contain",
            transform: "translateY(6%)",
          }}
        />

        {/* distance info */}
        <div
          style={{
            position: "absolute",
            left: 28,
            bottom: 28,
            color: "#000",
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "rgba(0,0,0,0.55)",
              marginBottom: 0,
              fontWeight: 500,
            }}
          >
            Today
          </div>
          <div style={{ fontWeight: 700, fontSize: 24 }}>6.2 MI</div>
        </div>

        {/* arrow button with hover */}
        <div
          style={{
            position: "absolute",
            right: 28,
            bottom: 28,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 6px #C4EAC4",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          <div
            style={{
              fontSize: 26,
              color: "#fff",
              transform: "translateX(2px)",
            }}
          >
            →
          </div>
        </div>
      </div>
    </>
  );
}
