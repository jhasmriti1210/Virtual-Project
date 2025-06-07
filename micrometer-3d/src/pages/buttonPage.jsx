import React, { useState } from "react";

export default function ButtonControl({
  onForward,
  onBackward,
  onLeft,
  onRight,
}) {
  const [activeBtn, setActiveBtn] = useState(null);

  const buttonStyle = {
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "20px",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  };

  const activeButtonStyle = {
    backgroundColor: "#cce5ff",
    borderColor: "#66b0ff",
  };

  const handleMouseDown = (btn) => {
    setActiveBtn(btn);
  };

  const handleMouseUp = () => {
    setActiveBtn(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        marginLeft: "34rem",
      }}
    >
      <button
        style={{
          ...buttonStyle,
          ...(activeBtn === "forward" ? activeButtonStyle : {}),
        }}
        onClick={onForward}
        onMouseDown={() => handleMouseDown("forward")}
        onMouseUp={handleMouseUp}
      >
        ↑
      </button>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            ...buttonStyle,
            ...(activeBtn === "left" ? activeButtonStyle : {}),
          }}
          onClick={onLeft}
          onMouseDown={() => handleMouseDown("left")}
          onMouseUp={handleMouseUp}
        >
          ←
        </button>

        <button
          style={{
            ...buttonStyle,
            ...(activeBtn === "right" ? activeButtonStyle : {}),
          }}
          onClick={onRight}
          onMouseDown={() => handleMouseDown("right")}
          onMouseUp={handleMouseUp}
        >
          →
        </button>
      </div>

      <button
        style={{
          ...buttonStyle,
          ...(activeBtn === "backward" ? activeButtonStyle : {}),
        }}
        onClick={onBackward}
        onMouseDown={() => handleMouseDown("backward")}
        onMouseUp={handleMouseUp}
      >
        ↓
      </button>
    </div>
  );
}
