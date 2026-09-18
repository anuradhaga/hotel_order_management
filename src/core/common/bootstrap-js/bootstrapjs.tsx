
"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useBootstrapTooltips } from '@/hooks/useBootstrapTooltips';

const BootstrapJs = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Only import Bootstrap JS on the client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js' as any);
  }, []);

  // Initialize Bootstrap tooltips on every route change
  useBootstrapTooltips([pathname]);

  return null;
};

export default BootstrapJs;