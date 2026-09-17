export const MARQUEE_WORDS = [
  "Ideas",
  "Content",
  "Ads",
  "Video",
  "WhatsApp",
  "LinkedIn",
  "Results",
];

export function instagramHref(profile: string) {
  const p = profile.trim();
  if (!p) return "";
  return p.startsWith("http") ? p : `https://www.instagram.com/${p.replace(/^@/, "")}/`;
}

export type ReelItem =
  | string
  | { gif?: string; video?: string; src?: string; poster?: string; image?: string };

export function reelMedia(item: ReelItem) {
  const r = typeof item === "string" ? { src: item } : item;
  const raw = (r.gif || r.video || r.src || "").trim();
  if (!raw) return null;
  const src = raw.startsWith("/") || raw.startsWith("http") ? raw : `/${raw}`;
  if (/\.gif$/i.test(src) || r.gif) {
    return { type: "gif" as const, src };
  }
  return { type: "video" as const, src, poster: r.poster || r.image };
}

export function kpiShortLabel(label: string) {
  return label.replace(/\s+(leads|chats|growth)$/i, "").trim();
}
