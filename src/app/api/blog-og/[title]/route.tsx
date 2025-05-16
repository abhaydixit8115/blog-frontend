import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

function formatString(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Default Title";
  const formattedTitle = formatString(title);
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage:
            "url(https://d39fb8qj0fdpwj.cloudfront.net/tech-category.jpg?width=1200&height=630)",

          objectFit: "cover",
        }}
      >
        {/* Title Text */}
        <div
          style={{
            fontSize: 100,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            borderRadius: "20px",
            backgroundColor: "black",
            padding: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {formattedTitle}
        </div>

        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 20,
            right: 20,
            borderRadius: "20px",
            backgroundColor: "black",
            padding: "20px",
            paddingTop: "10px",
          }}
        >
          <span
            style={{ fontSize: "60px", color: "#FFFFFF", fontWeight: "bold" }}
          >
            &#123;
          </span>
          <span
            style={{ fontSize: "60px", color: "#387ADF", fontWeight: "bold" }}
          >
            x
          </span>
          <span
            style={{ fontSize: "60px", color: "#FFFFFF", fontWeight: "bold" }}
          >
            &#125;
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
