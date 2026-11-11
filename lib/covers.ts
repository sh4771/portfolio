import type { CoverSpec } from "@/components/project-cover"

/** One interactive cover per project, shared by the homepage cards and each case study hero. */
export const COVERS: Record<string, CoverSpec> = {
  "vendelux": { kind: "video", bg: "#e7ebf2", video: "/videos/vendelux-cover.mp4", screens: ["/images/vendelux-cover-poster.jpg"] },
  "passiton": { kind: "phone", bg: "#ece6dd", video: "/videos/covers/passiton.mp4", screens: ["/images/covers/posters/covers-passiton-poster.jpg"] },
  "greener-routes": {
    kind: "phone",
    bg: "#dde8da",
    screens: ["/images/covers/greener-routes/p1.webp"],
    flow: [
      { src: "/images/covers/greener-routes/p1.webp", tap: [50, 92] },
      { src: "/images/covers/greener-routes/p2.webp", tap: [50, 92] },
      { src: "/images/covers/greener-routes/p3.webp", tap: [50, 63], next: "none", hold: 900 },
      { src: "/images/covers/greener-routes/p3.webp", tap: [50, 92], hold: 500 },
      { src: "/images/covers/greener-routes/p4.webp", tap: [50, 92], hold: 1300 },
      { src: "/images/covers/greener-routes/p5.webp", hold: 1600 },
    ],
  },
  "along": {
    kind: "phone",
    bg: "#f7dc6f",
    screens: ["/images/covers/along/0.webp"],
    flow: [
      { src: "/images/covers/along/0.webp", tap: [50, 85] },
      { src: "/images/covers/along/1.webp", tap: [86, 57], next: "none", hold: 900 },
      { src: "/images/covers/along/1.webp", tap: [86, 68], hold: 450 },
      { src: "/images/covers/along/2.webp", tap: [39, 94], hold: 1300 },
      { src: "/images/covers/along/3.webp", tap: [62, 95], next: "fade", hold: 1400 },
      { src: "/images/covers/along/4.webp", hold: 1600 },
    ],
  },
  "reconcile": { kind: "phone", bg: "#e6e0fb", video: "/videos/covers/reconcile.mp4", screens: ["/images/covers/posters/covers-reconcile-poster.jpg"] },
  "games4peace": { kind: "phone", bg: "#a3c2bb", video: "/videos/covers/games4peace.mp4", screens: ["/images/covers/posters/covers-games4peace-poster.jpg"] },
  "schedulink": {
    kind: "phone",
    bg: "#111111",
    dark: true,
    screens: ["/images/covers/schedulink/t2.webp"],
    flow: [
      { src: "/images/covers/schedulink/t2.webp", tap: [65, 12], next: "fade" },
      { src: "/images/covers/schedulink/t3.webp", next: "fade", hold: 1300 },
      { src: "/images/covers/schedulink/t4.webp", tap: [65, 12], next: "fade", hold: 900 },
      { src: "/images/covers/schedulink/t5.webp", next: "fade", hold: 1300 },
      { src: "/images/covers/schedulink/t6.webp", tap: [65, 12], next: "fade", hold: 900 },
      { src: "/images/covers/schedulink/t7.webp", hold: 1300 },
    ],
  },
  "cast": { kind: "image", fit: "cover", bg: "#eef1f4", screens: ["/images/cast.jpg"] },
  "clinical-trials": { kind: "desktop", bg: "#eceef3", video: "/videos/covers/clinical-trials.mp4", screens: ["/images/covers/posters/covers-clinical-trials-poster.jpg"] },
  "restaurant-bot": { kind: "desktop", bg: "#f9e3ee", video: "/videos/covers/restaurant-bot.mp4", screens: ["/images/covers/posters/covers-restaurant-bot-poster.jpg"] },
  "dating-app-for-dogs": { kind: "phone", bg: "#e4e6ea", screens: ["/images/sniffr/swipe.webp"] },
}
