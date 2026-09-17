"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioData } from "@/data/portfolio";

export function useProjectPanel(projects: PortfolioData["projects"]) {
  const [panelId, setPanelId] = useState<string | null>(null);
  const panelProject = panelId ? projects.find((p) => p.id === panelId) : null;
  const panelOpen = panelProject != null;

  const openProject = useCallback((id: string) => setPanelId(id), []);
  const closeProject = useCallback(() => setPanelId(null), []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, closeProject]);

  useEffect(() => {
    document.body.classList.toggle("panel-open", panelOpen);
  }, [panelOpen]);

  return { panelProject, panelOpen, openProject, closeProject };
}
