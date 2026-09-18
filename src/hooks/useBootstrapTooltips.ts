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
      // Clean existing tooltip DOM nodes (in case of improper disposal elsewhere)
      const oldTooltips = document.querySelectorAll('.tooltip');
      oldTooltips.forEach((el) => el.parentNode && el.parentNode.removeChild(el));

      // Initialize tooltips
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      ) as HTMLElement[];
      const tooltipInstances = tooltipTriggerList.map((el) => new Tooltip(el));

      // Store instances for cleanup
      (window as any).__tooltipInstances = tooltipInstances;
    });

    return () => {
      // Cleanup on unmount
      if (typeof document !== "undefined") {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
        
        // Dispose instances if they exist
        if ((window as any).__tooltipInstances) {
          (window as any).__tooltipInstances.forEach((instance: any) => 
            instance?.dispose && instance.dispose()
          );
          delete (window as any).__tooltipInstances;
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
