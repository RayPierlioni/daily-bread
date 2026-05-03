import { ImageResponse } from "next/og";

export const alt = "Daily Bread Hub devotional and prayer app";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fbf7ef",
          color: "#24302f",
          fontFamily: "Arial, sans-serif",
          padding: 64
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid #e4dccd",
            borderRadius: 28,
            background: "linear-gradient(135deg, #fffdf8 0%, #edf4ef 100%)",
            padding: 56
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 34, fontFamily: "Georgia, serif", fontStyle: "italic" }}>Daily Bread Hub</div>
            <div
              style={{
                border: "1px solid #d9cfbd",
                borderRadius: 999,
                padding: "10px 18px",
                color: "#345d6f",
                fontSize: 22
              }}
            >
              Free Christian App
            </div>
          </div>
          <div style={{ display: "flex", maxWidth: 880, flexDirection: "column" }}>
            <div style={{ color: "#b38b4d", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>Scripture. Prayer. Honest Questions.</div>
            <h1 style={{ margin: "24px 0 0", fontSize: 76, lineHeight: 1.04, fontWeight: 700 }}>Start every morning with God.</h1>
            <p style={{ margin: "28px 0 0", color: "#52605d", fontSize: 30, lineHeight: 1.35 }}>
              Daily devotionals, private prayer journaling, faith Q&A, and gentle Christian community.
            </p>
          </div>
          <div style={{ display: "flex", gap: 18, color: "#52605d", fontSize: 24 }}>
            <span>ourdailybreadhub.com</span>
            <span>Free to use</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
