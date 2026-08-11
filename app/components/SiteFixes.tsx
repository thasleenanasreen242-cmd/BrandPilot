"use client";

import { useEffect } from "react";

const STATS: Record<string, string> = {
  "Projects Delivered": "15+",
  "Client Satisfaction": "98%",
  "Avg. Traffic Growth": "3.5x",
  "Industries Served": "6+",
};

export default function SiteFixes() {
  useEffect(() => {
    const fixStats = () => {
      document.querySelectorAll("p").forEach((label) => {
        const key = label.textContent?.trim();
        const value = key ? STATS[key] : undefined;
        if (!value) return;
        const counter = label.parentElement?.querySelector("p:first-child") as HTMLElement | null;
        if (counter && counter.textContent?.trim() === "0") counter.textContent = value;
      });
    };

    fixStats();
    const observer = new MutationObserver(fixStats);
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });

    const video = document.getElementById("avatar-video") as HTMLVideoElement | null;
    const handleVideoError = () => {
      if (!video || video.dataset.fallbackApplied) return;
      video.dataset.fallbackApplied = "true";
      video.style.display = "none";
      const fallback = document.createElement("img");
      fallback.src = "/logo.png";
      fallback.alt = "BrandPilot AI Assistant";
      fallback.className = video.className;
      video.parentElement?.insertBefore(fallback, video);
    };
    video?.addEventListener("error", handleVideoError);

    return () => {
      observer.disconnect();
      video?.removeEventListener("error", handleVideoError);
    };
  }, []);

  return null;
}
