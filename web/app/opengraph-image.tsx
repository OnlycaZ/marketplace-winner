import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { color, papers } from "@/lib/tokens";

export const alt = `${site.name}: real clothes, studio backgrounds`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: color.bg,
          color: color.ink,
          padding: 72,
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Real clothes.</span>
          <span>Natural backgrounds.</span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {papers.map((p) => (
            <div key={p.id} style={{ width: 120, height: 28, borderRadius: 14, background: p.hex }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
