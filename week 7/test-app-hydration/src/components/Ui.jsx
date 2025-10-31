import hamburgerIcon from "../assets/icons/hamburger.png";
import profileIcon from "../assets/icons/profile.png";

/* Top bar icons (menu + profile) */
export function TopRow() {
  return (
    <div className="top-icons">
      <div
        className="icon-circle"
        aria-label="Menu"
        style={{ transition: "opacity 0.3s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      >
        <img
          src={hamburgerIcon}
          alt="Menu"
          style={{ width: 16, height: 16, objectFit: "contain" }}
        />
      </div>

      <div
        className="icon-circle"
        aria-label="Profile"
        style={{ transition: "opacity 0.3s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      >
        <img
          src={profileIcon}
          alt="Profile"
          style={{ width: 18, height: 18, objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

/* Reusable tag chip */
export function Chip({ children, dark }) {
  return <div className={"chip" + (dark ? " dark" : "")}>{children}</div>;
}

/* Toggle switch */
export function Toggle({ on, setOn }) {
  return (
    <button
      className={"toggle" + (on ? " on" : "")}
      onClick={() => setOn(!on)}
      aria-pressed={on}
    >
      <div className="thumb" />
    </button>
  );
}

/* Progress dots meter */
export function MeterPill({ value = 1, steps = 5, rightLabel = " " }) {
  return (
    <div className="meter card dark pad" role="group" aria-label="Level">
      <div className="dots" style={{ flex: 1 }}>
        {Array.from({ length: steps }).map((_, i) => (
          <div key={i} className={"dot" + (i <= value ? " active" : "")} />
        ))}
      </div>
      <div className="knob">{rightLabel}</div>
    </div>
  );
}

/* Circular hydration gauge */
export function Gauge({
  percent = 76,
  size = 280,
  stroke = 24,
  track = "#1f2225",
  fill = "#bfe6f0",
  label = "76%",
  sub = "Mild Dehydration",
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <div className="center" style={{ width: "100%", paddingTop: 8 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Hydration ${percent}%`}
      >
        {/* background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={track}
          strokeWidth={stroke}
          fill="none"
        />

        {/* progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={fill}
          strokeWidth={stroke - 6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dasharray 0.8s ease-out" }}
        />

        {/* labels */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          fontSize="48"
          fontWeight="800"
          fill="#222"
        >
          {`${percent}%`}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="16"
          fill="#3a3f42"
        >
          {sub}
        </text>
      </svg>
    </div>
  );
}

/* Small stat pill for Live Run */
export function MiniStat({ icon, label }) {
  return (
    <div
      style={{
        background: "#111",
        color: "#eaf0f3",
        padding: "12px 14px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span aria-hidden>{icon}</span>
      <div style={{ fontWeight: 700 }}>{label}</div>
    </div>
  );
}
