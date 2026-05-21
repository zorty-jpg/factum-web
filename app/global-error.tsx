"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#dc2626",
              margin: 0,
            }}
          >
            Site error
          </p>
          <h1
            style={{
              fontSize: 64,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: "32px 0 16px",
            }}
          >
            Something broke at the root.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.45, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            We hit an unexpected error. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              padding: "12px 24px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
