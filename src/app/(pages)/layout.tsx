"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import { useBootstrapTooltips } from "@/hooks/useBootstrapTooltips";
import { useMobileSidebarOverlay } from "@/hooks/useMobileSidebarOverlay";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import {
  resetMobileSidebar,
  setMobileSidebar,
  SidebarState,
} from "@/redux/sidebarSlice";
import { useIsMobile } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import Header from "@/core/common/header/header";
import Sidebar from "@/core/common/sidebar/sidebar";

const OutletLoader: React.FC = () => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ height: "100vh" }}
  >
    <span className="spinner" />
  </div>
);

const PageLayouts = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isOutletLoading, setIsOutletLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { mobileSidebar } = useAppSelector(
    (state: RootState) => state.sidebar as SidebarState
  );
  const expandMenu = useAppSelector(
    (state: RootState) => state.sidebar.expandMenu
  );
  const [hasFullWidthClass, setHasFullWidthClass] = useState(false);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isLayoutFullwidth = pathname === "/layout-fullwidth";

  // Initialize Bootstrap tooltips safely
  useBootstrapTooltips([pathname]);

  // Mobile sidebar overlay handling
  useMobileSidebarOverlay({
    mobileSidebar,
    isLayoutFullwidth,
    isMobile,
    containerRef: mainWrapperRef,
    onClose: () => dispatch(setMobileSidebar(false)),
  });

  // Reset mobile sidebar on route change
  useEffect(() => {
    dispatch(resetMobileSidebar());
  }, [pathname, dispatch]);

  // Set loading state on route change
  useEffect(() => {
    setIsOutletLoading(true);
  }, [pathname]);

  // Handle loading timeout
  useEffect(() => {
    // Clear previous timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsOutletLoading(false);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);


  return (
    <>
      <div className="main-wrapper" ref={mainWrapperRef}>
        <Header />
        <Sidebar />
        <Suspense fallback={<OutletLoader />}>
          {isOutletLoading ? <OutletLoader /> : children}
        </Suspense>
      </div>

      <div
        className={`sidebar-overlay${
          mobileSidebar || hasFullWidthClass ? " opened" : ""
        }`}
      />
    </>
  );
};

export default PageLayouts;
