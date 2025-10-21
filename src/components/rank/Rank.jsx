import React from "react";

export default function Rank({ data }) {
  const userId = data?.id;
  const name = data?.name || "Guest";
  const entries = data?.entries ?? 0;

  return (
    <div style={{ textAlign: "center", color: "#fff" }}>
      <div style={{ fontSize: "2.2rem" }}>{`${name}`}</div>

      <div style={{ fontSize: "1.9rem", color: "#cbd5e1" }}>
        {userId
          ? `Images processed: ${entries}`
          : "please sign in to show your rank!"}
      </div>
    </div>
  );
}
