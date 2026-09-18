import { all_routes } from "@/routes/all_routes"

 const routes = all_routes;

 export const sidebarTabData = [
  {
    id:"MAIN_Content",
    icon: "icon-layout-dashboard",
    section:[
      {
        title:"MAIN",
        items:[
          { link: routes.dashboard, label: "Dashboard", icon: "icon-layout-dashboard" },
          { link: routes.pos, label: "POS", icon: "icon-combine" },
          { link: routes.orders, label: "Orders", icon: "icon-list-todo", relativeLinks: [routes.kanbanView] },
          { link: routes.kitchen, label: "Kitchen (KDS)", icon: "icon-drumstick" },
          { link: routes.reservations, label: "Reservation", icon: "icon-file-clock" },
        ]
      }
    ]
  },
  {
    id:"MENU_MANAGEMENT_Content",
    icon: "icon-layers",
    section:[
      {
        title:"MENU MANAGEMENT",
        items:[
          { link: routes.categories, label: "Categories", icon: "icon-layers" },
          { link: routes.items, label: "Items", icon: "icon-layout-list" },
          { link: routes.addons, label: "Addons", icon: "icon-text-select" },
          { link: routes.coupons, label: "Coupons", icon: "icon-badge-percent" },
        ]
      }
    ]
  },
  {
    id:"OPERATIONS_Content",
    icon: "icon-merge",
    section:[
      {
        title:"OPERATIONS",
        items:[
          { link: routes.table, label: "Tables", icon: "icon-concierge-bell" },
          { link: routes.customer, label: "Customers", icon: "icon-user-round" },
          { link: routes.invoices, label: "Invoices", icon: "icon-file-spreadsheet",relativeLinks: [routes.invoicesDetails] },
          { link: routes.payments, label: "Payments", icon: "icon-badge-dollar-sign" },
        ]
      }
    ]
  },
  {
    id:"ADMINISTRATION_Content",
    icon: "icon-user-cog",
    section:[
      {
        title:"ADMINISTRATION",
        items:[
          { link: routes.users, label: "Users", icon: "icon-users" },
          { link: routes.rolePermissions, label: "Permissions", icon: "icon-shield" },
          { link: routes.earningReport, label: "Reports", icon: "icon-file-spreadsheet", relativeLinks: [routes.salesReport, routes.orderReport, routes.customerReport, routes.auditReport]},
        ]
      }
    ]
  },
  {
    id:"PAGES_Content",
    icon: "icon-library-big",
    section:[
      {
        title:"PAGES",
        items:[
          { link: routes.login, label: "Sign In", icon: "icon-lock-keyhole" },
          { link: routes.register, label: "Sign Up", icon: "icon-user-round-plus" },
          { link: routes.forgotPassword, label: "Forgot Password", icon: "icon-lock-keyhole-open" },
          { link: routes.emailVerification, label: "Email Verification", icon: "icon-mail" },
          { link: routes.otp, label: "OTP", icon: "icon-blocks" },
          { link: routes.resetPassword, label: "Reset Password", icon: "icon-lock-keyhole" },
        ]
      }
    ]
  },
  {
    id:"SETTINGS_Content",
    icon: "icon-cog",
    section:[
      {
        title:"SETTINGS",
        items:[
          { link: routes.storeSettings, label: "Store Settings", icon: "icon-warehouse" },
          { link: routes.taxSettings, label: "Tax", icon: "icon-diamond-percent" },
          { link: routes.printSettings, label: "Print", icon: "icon-printer" },
          { link: routes.paymentSettings, label: "Payment Types", icon: "icon-circle-dollar-sign" },
          { link: routes.deliverySettings, label: "Delivery", icon: "icon-bike" },
          { link: routes.notificationsSettings, label: "Notifications", icon: "icon-bell" },
          { link: routes.integrationsSettings, label: "Integrations / API", icon: "icon-pin" },
        ]
      }
    ]
  },
 ]