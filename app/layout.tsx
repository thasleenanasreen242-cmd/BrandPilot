import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BrandPilotStructuredData from "./BrandPilotStructuredData";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://www.brandpilotcloud.com";
const title = "Digital Marketing Agency in Kerala | SEO & Web Design | BrandPilot";
const description = "BrandPilot is a digital marketing agency in Kerala, India offering SEO, local SEO, web design, technical SEO, social media, PPC and AI-powered marketing solutions.";
const socialImage = `${siteUrl}/logo.png`;
const googleAnalyticsId = "G-V50C5F8D7V";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["digital marketing agency Kerala","digital marketing agency Kozhikode","digital marketing agency India","SEO services Kerala","SEO agency Kerala","local SEO services Kozhikode","technical SEO services","on-page SEO","off-page SEO","web design Kerala","web development Kerala","social media marketing","Google Ads","Meta Ads","AI marketing"],
  alternates: { canonical: siteUrl },
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  openGraph: { title, description, url: siteUrl, siteName: "BrandPilot", type: "website", locale: "en_US", images: [{ url: socialImage, alt: "BrandPilot digital marketing agency logo" }] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>
        <BrandPilotStructuredData />
        {children}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="brandpilot-google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });
          `}
        </Script>

        <Script id="brandpilot-avatar-loader" strategy="afterInteractive">
          {`
            (() => {
              const replaceAvatar = () => {
                document.querySelectorAll('img[src="/avatar.svg"]').forEach((img) => {
                  if (img.dataset.avatarReplaced === "true") return;

                  const wrapper = document.createElement("div");
                  wrapper.style.position = "relative";
                  wrapper.style.width = "100%";
                  wrapper.style.height = "100%";
                  wrapper.style.borderRadius = "9999px";
                  wrapper.style.overflow = "hidden";

                  const video = document.createElement("video");
                  video.src = "/avatar.mp4";
                  video.autoplay = true;
                  video.muted = true;
                  video.loop = true;
                  video.playsInline = true;
                  video.setAttribute("aria-label", "BrandPilot AI Assistant");
                  video.className = img.className;
                  video.style.cursor = "pointer";
                  video.dataset.avatarReplaced = "true";
                  video.preload = "metadata";

                  const muteButton = document.createElement("button");
                  muteButton.type = "button";
                  muteButton.textContent = "🔇 Muted";
                  muteButton.setAttribute("aria-label", "Toggle avatar sound");
                  Object.assign(muteButton.style, {
                    position: "absolute",
                    bottom: "8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: "5",
                    padding: "5px 10px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,.2)",
                    background: "rgba(0,0,0,.6)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    fontSize: "11px",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  });

                  muteButton.addEventListener("click", (event) => {
                    event.stopPropagation();
                    video.muted = !video.muted;
                    if (!video.muted) video.play().catch(() => {});
                    muteButton.textContent = video.muted ? "🔇 Muted" : "🔊 Sound on";
                  });

                  wrapper.appendChild(video);
                  wrapper.appendChild(muteButton);
                  img.replaceWith(wrapper);
                });
              };

              replaceAvatar();
              const observer = new MutationObserver(replaceAvatar);
              observer.observe(document.body, { childList: true, subtree: true });
              window.addEventListener("beforeunload", () => observer.disconnect(), { once: true });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
