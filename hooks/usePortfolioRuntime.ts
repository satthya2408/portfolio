"use client";

import { useEffect, useRef } from "react";
import type { PortfolioData } from "@/data/portfolio";
import { initHero3D } from "@/lib/hero3d";
import { initMarketChart } from "@/lib/marketChart";
import { initPortfolioMotion } from "@/lib/motion";

export function usePortfolioRuntime(data: PortfolioData) {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const reelsTrackRef = useRef<HTMLDivElement>(null);
  const marketCanvasRef = useRef<HTMLCanvasElement>(null);
  const marketPanelRef = useRef<HTMLDivElement>(null);
  const marketReadoutRef = useRef<HTMLSpanElement>(null);
  const marketPairRef = useRef<HTMLSpanElement>(null);
  const marketPeriodRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const disposeHero = initHero3D(heroCanvasRef.current);
    const disposeChart = initMarketChart(
      marketCanvasRef.current,
      marketPanelRef.current,
      marketReadoutRef.current,
      marketPairRef.current,
      marketPeriodRef.current,
      data
    );

    const header = document.querySelector(".site-header");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const fallback = data.images?.fallback || "/assets/images/hero.jpg";
    const onImgError = (e: Event) => {
      const img = e.currentTarget as HTMLImageElement;
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "1";
      img.src = fallback;
    };
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", onImgError);
    });

    document.querySelectorAll(".hero-copy > *").forEach((el, i) => {
      el.classList.add("motion-pending");
      (el as HTMLElement).style.setProperty("--motion-i", String(i));
      requestAnimationFrame(() => el.classList.add("motion-in"));
    });
    const frame = document.querySelector(".hero-frame");
    if (frame) {
      frame.classList.add("motion-pending");
      requestAnimationFrame(() => frame.classList.add("motion-in"));
    }

    initPortfolioMotion();

    return () => {
      disposeHero?.();
      disposeChart?.();
      window.removeEventListener("scroll", onScroll);
      document.querySelectorAll("img").forEach((img) => {
        img.removeEventListener("error", onImgError);
      });
    };
  }, [data]);

  const scrollReels = (dir: -1 | 1) => {
    const track = reelsTrackRef.current;
    if (!track) return;
    const step = (track.querySelector(".reel")?.getBoundingClientRect().width || 240) + 14;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return {
    heroCanvasRef,
    reelsTrackRef,
    marketCanvasRef,
    marketPanelRef,
    marketReadoutRef,
    marketPairRef,
    marketPeriodRef,
    scrollReels,
  };
}
