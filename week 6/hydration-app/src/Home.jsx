import React from "react";
import homePng from "./Assets/Home.png";

export default function Home() {
  return (
    <div>
      <img
        src={homePng}
        alt="Home"
        style={{ width: 600, height: 600, borderRadius: 12, objectFit: "contain" }}
      />
    </div>
  );
}
