const mysql = require('mysql2/promise');

async function setupEvents() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '162.215.13.177',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'dsschool_hom',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'Welcome@hom',
    database: process.env.DB_NAME || 'dsschool_hom'
  });

  try {
    console.log('Connected to MySQL. Checking events table columns...');

    // Helper to safely add column if not exists
    const addColumnIfNotExists = async (table, column, colDef) => {
      const [rows] = await conn.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [table, column]
      );
      if (rows.length === 0) {
        console.log(`Adding column ${column} to ${table}...`);
        await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${colDef}`);
      } else {
        console.log(`Column ${column} already exists in ${table}.`);
      }
    };

    // Ensure events table exists
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`events\` (
        \`event_id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`event_code\` VARCHAR(20) NOT NULL UNIQUE,
        \`event_name\` VARCHAR(100) NOT NULL,
        \`start_datetime\` DATETIME NOT NULL,
        \`end_datetime\` DATETIME NOT NULL,
        \`location_name\` VARCHAR(100) NOT NULL,
        \`is_active\` BOOLEAN DEFAULT TRUE,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Add extra columns to events
    await addColumnIfNotExists('events', 'event_type', "VARCHAR(50) NOT NULL DEFAULT 'BANQUET'");
    await addColumnIfNotExists('events', 'outlet_id', "INT NULL");
    await addColumnIfNotExists('events', 'dedicated_kitchen_dept', "VARCHAR(50) NOT NULL DEFAULT 'BANQUET_KITCHEN'");
    await addColumnIfNotExists('events', 'expected_guests', "INT NOT NULL DEFAULT 50");
    await addColumnIfNotExists('events', 'organizer_name', "VARCHAR(100) NULL");
    await addColumnIfNotExists('events', 'organizer_contact', "VARCHAR(30) NULL");
    await addColumnIfNotExists('events', 'billing_type', "VARCHAR(30) NOT NULL DEFAULT 'PER_ORDER'");
    await addColumnIfNotExists('events', 'status', "VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'");
    await addColumnIfNotExists('events', 'notes', "TEXT NULL");

    // Add dedicated_kitchen_dept to order_items if needed, or check if cooking_notes / kitchen_dept can be tracked
    await addColumnIfNotExists('order_items', 'routed_kitchen_dept', "VARCHAR(50) NULL");

    // Create event_menu_items table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`event_menu_items\` (
        \`event_menu_item_id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`event_id\` INT NOT NULL,
        \`item_id\` INT NOT NULL,
        \`custom_price\` DECIMAL(10,2) NULL,
        \`is_complimentary\` BOOLEAN DEFAULT FALSE,
        \`override_kitchen_dept\` VARCHAR(50) NULL,
        \`display_order\` INT DEFAULT 0,
        \`is_available\` BOOLEAN DEFAULT TRUE,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`item_id\`) ON DELETE CASCADE,
        UNIQUE KEY \`uk_event_item\` (\`event_id\`, \`item_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('Verified event_menu_items table.');

    // Seed or update sample events
    await conn.query(`
      INSERT INTO \`events\` 
        (\`event_id\`, \`event_code\`, \`event_name\`, \`event_type\`, \`outlet_id\`, \`dedicated_kitchen_dept\`, \`expected_guests\`, \`location_name\`, \`start_datetime\`, \`end_datetime\`, \`organizer_name\`, \`organizer_contact\`, \`status\`, \`is_active\`)
      VALUES 
        (1, 'EVT-GALA-2026', 'Grand Dilara Executive Gala Dinner', 'GALA_DINNER', 4, 'BANQUET_KITCHEN', 120, 'Grand Ballroom A', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'Apex Corporate Holdings', '+94 77 123 4567', 'ACTIVE', 1),
        (2, 'EVT-POOL-SUNSET', 'Sunset Jazz & Cocktails Night', 'COCKTAIL_PARTY', 2, 'BAR', 75, 'Poolside Terrace', NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), 'Dilara Club Privileges', '+94 71 987 6543', 'ACTIVE', 1),
        (3, 'EVT-ROYAL-WED', 'Royal Dilara Wedding Banquet - Perera & Silva', 'WEDDING', 4, 'BANQUET_KITCHEN', 250, 'Grand Sapphire Ballroom', DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_ADD(NOW(), INTERVAL 4 DAY), 'Mr. K. Perera', '+94 70 555 1212', 'ACTIVE', 1)
      ON DUPLICATE KEY UPDATE
        \`event_name\` = VALUES(\`event_name\`),
        \`event_type\` = VALUES(\`event_type\`),
        \`dedicated_kitchen_dept\` = VALUES(\`dedicated_kitchen_dept\`),
        \`expected_guests\` = VALUES(\`expected_guests\`),
        \`location_name\` = VALUES(\`location_name\`),
        \`organizer_name\` = VALUES(\`organizer_name\`),
        \`status\` = VALUES(\`status\`),
        \`is_active\` = 1;
    `);
    console.log('Seeded / updated sample events.');

    // Link customized menu items to Event 1 (Gala Dinner) and Event 2 (Sunset Jazz)
    const [items] = await conn.query('SELECT item_id, item_name, kitchen_dept FROM items ORDER BY item_id ASC LIMIT 15');
    if (items.length > 0) {
      // Event 1 custom items
      const galaItems = [
        { id: items[0].item_id, price: 1500.00, comp: 0, dept: 'BANQUET_KITCHEN' }, // Starter discounted for Gala
        { id: items[1].item_id, price: 1400.00, comp: 0, dept: 'BANQUET_KITCHEN' },
        { id: items[3] ? items[3].item_id : items[0].item_id, price: 6500.00, comp: 0, dept: 'BANQUET_KITCHEN' }, // Steak
        { id: items[4] ? items[4].item_id : items[1].item_id, price: 5800.00, comp: 0, dept: 'BANQUET_KITCHEN' }, // Seafood Platter
        { id: items[10] ? items[10].item_id : items[0].item_id, price: 0.00, comp: 1, dept: 'BANQUET_KITCHEN' }, // Complimentary Dessert
      ];

      for (const gi of galaItems) {
        await conn.query(`
          INSERT INTO \`event_menu_items\` 
            (\`event_id\`, \`item_id\`, \`custom_price\`, \`is_complimentary\`, \`override_kitchen_dept\`, \`is_available\`)
          VALUES (?, ?, ?, ?, ?, 1)
          ON DUPLICATE KEY UPDATE 
            \`custom_price\` = VALUES(\`custom_price\`),
            \`is_complimentary\` = VALUES(\`is_complimentary\`),
            \`override_kitchen_dept\` = VALUES(\`override_kitchen_dept\`);
        `, [1, gi.id, gi.price, gi.comp, gi.dept]);
      }

      console.log('Seeded customized menu items for Event 1 (Gala Dinner).');

      // Event 2 (Cocktails) custom items
      const cocktailItems = items.filter(i => i.kitchen_dept === 'BAR' || i.item_name.toLowerCase().includes('refresher') || i.item_name.toLowerCase().includes('mojito') || i.item_name.toLowerCase().includes('arrack'));
      for (const ci of cocktailItems) {
        await conn.query(`
          INSERT INTO \`event_menu_items\` 
            (\`event_id\`, \`item_id\`, \`custom_price\`, \`is_complimentary\`, \`override_kitchen_dept\`, \`is_available\`)
          VALUES (?, ?, ?, 0, 'BAR', 1)
          ON DUPLICATE KEY UPDATE 
            \`custom_price\` = VALUES(\`custom_price\`);
        `, [2, ci.item_id, 1200.00]);
      }
      console.log('Seeded customized bar items for Event 2 (Sunset Jazz).');
    }

    console.log('Special Events setup completed successfully.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await conn.end();
  }
}

setupEvents();
