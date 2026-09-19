import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/', // the URL you want in browser
        destination: '/pos', // default to POS
      },
      {
        source: '/reports/earning_report',
        destination: '/reports/earning-report',
      },
      {
        source: '/reports/order_report',
        destination: '/reports/order-report',
      },
      {
        source: '/reports/sales_report',
        destination: '/reports/sales-report',
      },
      {
        source: '/reports/customer_report',
        destination: '/reports/customer-report',
      },
      {
        source: '/reports/audit_report',
        destination: '/reports/audit-report',
      },
    ];
  },


};

export default nextConfig;
