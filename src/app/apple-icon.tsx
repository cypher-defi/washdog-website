import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          background: "#4A90D9",
          display: "flex",
          position: "relative",
        }}
      >
        {/* Main pad */}
        <div
          style={{
            position: "absolute",
            width: 79,
            height: 65,
            borderRadius: "50%",
            background: "white",
            left: 50,
            top: 79,
          }}
        />
        {/* Top-left toe */}
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 43,
            borderRadius: "50%",
            background: "white",
            left: 36,
            top: 47,
          }}
        />
        {/* Top-right toe */}
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 43,
            borderRadius: "50%",
            background: "white",
            left: 108,
            top: 47,
          }}
        />
        {/* Left toe */}
        <div
          style={{
            position: "absolute",
            width: 29,
            height: 36,
            borderRadius: "50%",
            background: "white",
            left: 25,
            top: 81,
          }}
        />
        {/* Right toe */}
        <div
          style={{
            position: "absolute",
            width: 29,
            height: 36,
            borderRadius: "50%",
            background: "white",
            left: 126,
            top: 81,
          }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  )
}
