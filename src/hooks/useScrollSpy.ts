import { useEffect } from "react";

/**
 * Keeps the URL hash in sync with the section under the middle of the
 * viewport. Sections are looked up by id on every check (not observed once),
 * because some are swapped after load (the contact skeleton becomes the real
 * form) and a stale observer would never see the new element.
 *
 * The document title is left alone so the page keeps its SEO title.
 */
export function useScrollSpy(sectionIds: string[]) {
  useEffect(() => {
    let frame = 0;
    let current = "";

    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const id = sectionIds.find((sectionId) => {
        const rect = document.getElementById(sectionId)?.getBoundingClientRect();
        return rect !== undefined && rect.top <= middle && rect.bottom > middle;
      });

      if (id && id !== current) {
        current = id;
        // Keep Next.js router state; only the hash changes
        history.replaceState(history.state, "", `#${id}`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sectionIds]);
}
