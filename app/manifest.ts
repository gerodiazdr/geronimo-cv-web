import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gerónimo Díaz De Rosa — Brand & Growth",
    short_name: "Gerónimo DDR",
    description: "Head of Marketing & Sales. Brand positioning, content, GTM, web, AI and data.",
    start_url: "/",
    display: "browser",
    background_color: "#f4f4f4",
    theme_color: "#ff5e8a",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
