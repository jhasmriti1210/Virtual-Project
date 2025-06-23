import React, { useState } from "react";

export default function ButtonControl({
  onForward,
  onBackward,
  onLeft,
  onRight,
  isForwardDisabled,
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
    transition: "all 0.2s ease",
  };

  const activeButtonStyle = {
    backgroundColor: "#cce5ff",
    borderColor: "#66b0ff",
  };

  const disabledStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const handleMouseDown = (btn) => setActiveBtn(btn);
  const handleMouseUp = () => setActiveBtn(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        marginTop: "1rem",
      }}
    >
      <button
        style={{
          ...buttonStyle,
          ...(activeBtn === "forward" ? activeButtonStyle : {}),
          ...(isForwardDisabled ? disabledStyle : {}),
        }}
        onClick={onForward}
        onMouseDown={() => handleMouseDown("forward")}
        onMouseUp={handleMouseUp}
        title="Move Thimble Forward (Close)"
        disabled={isForwardDisabled}
      >
        ↓
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
          title="Rotate Ratchet"
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
          title="Insert Between Anvil and Spindle"
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
        title="Move Thimble Backward (Open)"
      >
        ↑
      </button>
    </div>
  );
}
