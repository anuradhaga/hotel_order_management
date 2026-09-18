"use client";

import { all_routes } from "@/routes/all_routes";
import Link from "next/link";
import location, { usePathname } from "next/navigation"

const tabs = [
  { label: "Earning Report", route: all_routes.earningReport, icon: "icon-badge-dollar-sign" },
  { label: "Order Report", route: all_routes.orderReport, icon: "icon-list-todo" },
  { label: "Sales Report", route: all_routes.salesReport, icon: "icon-shopping-bag" },
  { label: "Customer Report", route: all_routes.customerReport, icon: "icon-users"},
  { label: "Audit Logs", route: all_routes.auditReport, icon: "icon-hourglass"  },
];


const Reportstab = () => {
  const location = usePathname();
  return (
    <ul className="nav nav-tabs nav-bordered nav-bordered-primary mb-4">
      {tabs.map((tab) => (
        <li className="nav-item" key={tab.route}>
          <Link
            href={tab.route}
            className={`nav-link d-flex align-items-center ${location === tab.route ? " active" : ""}`}
          >
            <i className={`${tab.icon} me-2`} />
            {tab.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Reportstab; 