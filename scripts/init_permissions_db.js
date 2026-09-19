const mysql = require("mysql2/promise");

const DEFAULT_ROLES = [
  { code: "ADMIN", name: "Admin", description: "Full system administrative access" },
  { code: "SUPERVISOR", name: "Supervisor", description: "Operational floor supervision and approvals" },
  { code: "CASHIER", name: "Cashier", description: "Billing, settlement, and cash drawer management" },
  { code: "CHEF", name: "Chef", description: "Kitchen order display, preparation status, and recipe access" },
  { code: "WAITER", name: "Waiter", description: "Table ordering, guest management, and order taking" },
  { code: "ACCOUNTANT", name: "Accountant", description: "Invoices, tax auditing, reports, and export permissions" },
  { code: "SYSTEM OPERATOR", name: "System Operator", description: "Hardware diagnostics, sync management, and configuration" },
  { code: "MANAGER", name: "Manager", description: "Full restaurant and staff management permissions" },
  { code: "EXPEDITER", name: "Expediter", description: "Kitchen pass coordination, dispatching, and quality check" },
];

const MODULES = [
  { key: "dashboard", name: "Dashboard" },
  { key: "pos", name: "POS" },
  { key: "hold_resume", name: "Hold/Resume Sale" },
  { key: "refund_return", name: "Refund / Return" },
  { key: "products", name: "Products" },
  { key: "categories", name: "Categories" },
  { key: "customers", name: "Customers" },
  { key: "reports", name: "Reports" },
  { key: "settings", name: "Settings" },
  { key: "orders", name: "Orders" },
  { key: "kitchen", name: "Kitchen" },
];

// Matrix defaults per role
function getDefaultPerms(roleCode, moduleKey) {
  if (roleCode === "ADMIN" || roleCode === "MANAGER") {
    return { can_view: 1, can_add: 1, can_edit: 1, can_delete: 1, can_export: 1, can_approve: 1 };
  }
  if (roleCode === "SUPERVISOR") {
    const isRestricted = ["settings"].includes(moduleKey);
    return {
      can_view: 1,
      can_add: isRestricted ? 0 : 1,
      can_edit: isRestricted ? 0 : 1,
      can_delete: 0,
      can_export: 1,
      can_approve: 1,
    };
  }
  if (roleCode === "CASHIER") {
    if (["pos", "hold_resume", "orders", "customers"].includes(moduleKey)) {
      return { can_view: 1, can_add: 1, can_edit: 1, can_delete: 0, can_export: 0, can_approve: 0 };
    }
    if (moduleKey === "refund_return") {
      return { can_view: 1, can_add: 1, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
    }
    if (moduleKey === "reports") {
      return { can_view: 1, can_add: 0, can_edit: 0, can_delete: 0, can_export: 1, can_approve: 0 };
    }
    return { can_view: 0, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
  }
  if (roleCode === "WAITER") {
    if (["pos", "orders", "customers", "hold_resume"].includes(moduleKey)) {
      return { can_view: 1, can_add: 1, can_edit: 1, can_delete: 0, can_export: 0, can_approve: 0 };
    }
    return { can_view: 0, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
  }
  if (roleCode === "CHEF") {
    if (["kitchen", "orders"].includes(moduleKey)) {
      return { can_view: 1, can_add: 0, can_edit: 1, can_delete: 0, can_export: 0, can_approve: 1 };
    }
    if (moduleKey === "products") {
      return { can_view: 1, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
    }
    return { can_view: 0, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
  }
  if (roleCode === "EXPEDITER") {
    if (["kitchen", "orders"].includes(moduleKey)) {
      return { can_view: 1, can_add: 0, can_edit: 1, can_delete: 0, can_export: 0, can_approve: 1 };
    }
    return { can_view: 0, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
  }
  if (roleCode === "ACCOUNTANT") {
    if (["reports", "dashboard", "orders"].includes(moduleKey)) {
      return { can_view: 1, can_add: 0, can_edit: 0, can_delete: 0, can_export: 1, can_approve: 0 };
    }
    return { can_view: 0, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
  }
  if (roleCode === "SYSTEM OPERATOR") {
    if (["dashboard", "settings", "reports"].includes(moduleKey)) {
      return { can_view: 1, can_add: 1, can_edit: 1, can_delete: 1, can_export: 1, can_approve: 1 };
    }
    return { can_view: 1, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
  }
  return { can_view: 1, can_add: 0, can_edit: 0, can_delete: 0, can_export: 0, can_approve: 0 };
}

async function initPermissionsSchema() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "162.215.13.177",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "dsschool_hom",
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "Welcome@hom",
    database: process.env.DB_NAME || "dsschool_hom",
  });

  console.log("Connected to MySQL for permissions setup.");

  try {
    // 1. Create roles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`roles\` (
        \`role_id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`role_code\` VARCHAR(50) NOT NULL UNIQUE,
        \`role_name\` VARCHAR(100) NOT NULL,
        \`description\` VARCHAR(255) NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("Verified 'roles' table.");

    // 2. Create role_permissions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`role_permissions\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`role_code\` VARCHAR(50) NOT NULL,
        \`module_key\` VARCHAR(50) NOT NULL,
        \`module_name\` VARCHAR(100) NOT NULL,
        \`can_view\` TINYINT(1) DEFAULT 0,
        \`can_add\` TINYINT(1) DEFAULT 0,
        \`can_edit\` TINYINT(1) DEFAULT 0,
        \`can_delete\` TINYINT(1) DEFAULT 0,
        \`can_export\` TINYINT(1) DEFAULT 0,
        \`can_approve\` TINYINT(1) DEFAULT 0,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY \`uk_role_module\` (\`role_code\`, \`module_key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("Verified 'role_permissions' table.");

    // 3. Seed default roles
    for (const r of DEFAULT_ROLES) {
      await connection.execute(
        `INSERT INTO \`roles\` (\`role_code\`, \`role_name\`, \`description\`)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE \`role_name\` = VALUES(\`role_name\`), \`description\` = VALUES(\`description\`)`,
        [r.code, r.name, r.description]
      );
    }
    console.log(`Seeded ${DEFAULT_ROLES.length} roles.`);

    // 4. Seed default permissions matrix
    let seededCount = 0;
    for (const r of DEFAULT_ROLES) {
      for (const m of MODULES) {
        const p = getDefaultPerms(r.code, m.key);
        await connection.execute(
          `INSERT INTO \`role_permissions\`
             (\`role_code\`, \`module_key\`, \`module_name\`, \`can_view\`, \`can_add\`, \`can_edit\`, \`can_delete\`, \`can_export\`, \`can_approve\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             \`module_name\` = VALUES(\`module_name\`),
             \`can_view\` = VALUES(\`can_view\`),
             \`can_add\` = VALUES(\`can_add\`),
             \`can_edit\` = VALUES(\`can_edit\`),
             \`can_delete\` = VALUES(\`can_delete\`),
             \`can_export\` = VALUES(\`can_export\`),
             \`can_approve\` = VALUES(\`can_approve\`)`,
          [r.code, m.key, m.name, p.can_view, p.can_add, p.can_edit, p.can_delete, p.can_export, p.can_approve]
        );
        seededCount++;
      }
    }
    console.log(`Seeded ${seededCount} role-permission records.`);
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await connection.end();
  }
}

initPermissionsSchema();
