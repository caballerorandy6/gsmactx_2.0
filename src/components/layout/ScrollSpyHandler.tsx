"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function ScrollSpyHandler() {
  useScrollSpy(["home", "about", "services", "testimonials", "contact"]);
  return null; // No renderiza nada, solo ejecuta la lógica
}
