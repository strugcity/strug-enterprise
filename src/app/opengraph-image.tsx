import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Strug City — AI-Powered Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060611",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 232, 123, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 255, 221, 0.15) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              background: "linear-gradient(135deg, #00e87b 0%, #00ffdd 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textAlign: "center",
            }}
          >
            Strug City
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            AI-Powered Engineering in the Open
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(0, 232, 123, 0.9)",
              marginTop: "16px",
            }}
          >
            Building the future with AI tools and platforms
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
