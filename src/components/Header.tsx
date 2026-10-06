import { useState } from "react";
import PixelSquare from "./base/PixelSquare";

export default function Header() {
  const [status, setStatus] = useState("Available");
  const [color, setColor] = useState("#F5C518");

  const handleClick = () => {
    setStatus((prev) => (prev === "Available" ? "Unavailable" : "Available"));
    setColor((prevColor) => (prevColor === "#F5C518" ? "#FF0055" : "#F5C518"));
  };

  return (
    <header
      className="relative z-10 font-pixel font-weight"
      style={{ padding: "12px 20px", background: "#3B2A1A", borderBottom: "4px solid #c9a24b" }}
    >
      <ul className="flex gap-40 justify-center">
        <li>
          <button className="flex gap-3 items-center" onClick={handleClick}>
            <PixelSquare color={color}></PixelSquare>
            <span
              className="w-85 text-left inline-block"
              style={{ color: color, textShadow: "2px 2px 0 rgba(0,0,0,0.4)" }}
            >
              Status: {status}
            </span>
          </button>
        </li>

        <li className="flex gap-4 items-center">
          <PixelSquare color="#F5C518"></PixelSquare>
          <span
            className="text-left inline-block"
            style={{ color: "#F5C518", textShadow: "2px 2px 0 rgba(0,0,0,0.4)" }}
          >
            Quest: Internship - 0/1
          </span>
        </li>
      </ul>
    </header>
  );
}
