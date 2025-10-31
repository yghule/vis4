import React from "react";
import liveRunPng from "./Assets/LiveRun.png";

export default function LiveRun() {
  return (
    <div>
      <img
        src={liveRunPng}
        alt="Live Run"
        style={{ width: 600, height: 600, borderRadius: 12, objectFit: "contain" }}
      />
    </div>
  );
}
