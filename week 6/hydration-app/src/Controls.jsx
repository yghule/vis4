import React from "react";
import controlsPng from "./Assets/Controls.png";

export default function Controls() {
  return (
    <div>
      <img
        src={controlsPng}
        alt="Controls"
        style={{ width: 600, height: 600, borderRadius: 12, objectFit: "contain" }}
      />
    </div>
  );
}
