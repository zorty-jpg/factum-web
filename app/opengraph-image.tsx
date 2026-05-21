import { ImageResponse } from "next/og";

export const alt = "Factum Fitness MMA — Sandy, Utah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#dc2626",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              background: "#dc2626",
              display: "block",
            }}
          />
          Factum Fitness MMA
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 180,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 0.9,
            }}
          >
            FACTUM
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 900,
              lineHeight: 1.2,
            }}
          >
            Boxing · Kickboxing · Muay Thai · Jiu Jitsu · MMA · Functional Fitness
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>Sandy, Utah</span>
          <span>First class is free</span>
        </div>
      </div>
    ),
    size,
  );
}
