"use client";
import { useEffect } from "react";

/**
 * Initialize Bootstrap tooltips for elements with data-bs-toggle="tooltip".
 * Cleans up instances and stray DOM nodes on dependency change/unmount.
 *
 * Usage:
 *   useBootstrapTooltips([location.pathname])
 */
export function useBootstrapTooltips(deps: any[] = []) {
  useEffect(() => {
    // Guard against SSR - only run on client side
    if (typeof document === "undefined") return;

    // Dynamically import Bootstrap Tooltip to avoid SSR issues
    import('bootstrap/js/dist/tooltip').then(({ default: Tooltip }) => {
      try {
        // Clean existing tooltip DOM nodes
        const oldTooltips = document.querySelectorAll('.tooltip');
        oldTooltips.forEach((el) => el.parentNode && el.parentNode.removeChild(el));

        // Initialize tooltips safely with getOrCreateInstance
        const tooltipTriggerList = Array.from(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        ) as HTMLElement[];
        
        const tooltipInstances = tooltipTriggerList
          .map((el) => {
            try {
              return Tooltip.getOrCreateInstance ? Tooltip.getOrCreateInstance(el) : new Tooltip(el);
            } catch {
              return null;
            }
          })
          .filter(Boolean);

        // Store instances for cleanup
        (window as any).__tooltipInstances = tooltipInstances;
      } catch (err) {
        // Gracefully ignore tooltip init errors in fast refresh
      }
    });

    return () => {
      // Cleanup on unmount
      if (typeof document !== "undefined") {
        try {
          const tooltips = document.querySelectorAll('.tooltip');
          tooltips.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
          
          // Dispose instances if they exist
          if ((window as any).__tooltipInstances) {
            (window as any).__tooltipInstances.forEach((instance: any) => {
              try {
                instance?.dispose?.();
              } catch {}
            });
            delete (window as any).__tooltipInstances;
          }
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
