const mysql = require('mysql2/promise');

async function migrate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '162.215.13.177',
    user: process.env.DB_USER || 'dsschool_hom',
    password: process.env.DB_PASSWORD || 'Welcome@hom',
    database: process.env.DB_NAME || 'dsschool_hom'
  });

  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`item_addons\` (
        \`addon_id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`item_id\` INT NOT NULL,
        \`addon_name\` VARCHAR(100) NOT NULL,
        \`price\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        \`description\` TEXT NULL,
        \`image_url\` VARCHAR(255) NULL,
        \`is_active\` BOOLEAN DEFAULT TRUE,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`item_id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('Created item_addons table.');

    // Check count
    const [[countRow]] = await conn.query('SELECT COUNT(*) as count FROM item_addons');
    if (countRow.count === 0) {
      // Get some actual item_ids
      const [items] = await conn.query('SELECT item_id, item_name FROM items ORDER BY item_id ASC LIMIT 10');
      if (items.length > 0) {
        const p1 = items.find(i => i.item_name.toLowerCase().includes('pizza')) || items[0];
        const p2 = items.find(i => i.item_name.toLowerCase().includes('calamari')) || items[1] || items[0];
        const p3 = items.find(i => i.item_name.toLowerCase().includes('ribeye')) || items[2] || items[0];
        const p4 = items.find(i => i.item_name.toLowerCase().includes('seafood') || i.item_name.toLowerCase().includes('platter')) || items[3] || items[0];
        const p5 = items.find(i => i.item_name.toLowerCase().includes('wings')) || items[4] || items[0];

        const initialAddons = [
          [p1.item_id, 'Extra Mozzarella Cheese', 350.00, 'Double portion of melted mozzarella cheese.', 1],
          [p1.item_id, 'Crispy Bacon Bits', 400.00, 'Smoked crispy bacon crumbles.', 1],
          [p2.item_id, 'Extra Homemade Tartar Sauce', 150.00, 'Creamy herb and caper tartar sauce.', 1],
          [p3.item_id, 'Garlic Herb Butter Glaze', 250.00, 'Melted roasted garlic and parsley compound butter.', 1],
          [p3.item_id, 'Side Truffle Potato Wedges', 550.00, 'Hand-cut wedges tossed in white truffle oil.', 1],
          [p4.item_id, 'Grilled Jumbo Tiger Prawn (1 pc)', 850.00, 'Marinated jumbo tiger prawn grilled to perfection.', 1],
          [p5.item_id, 'Extra Spicy Ghost Pepper Dip', 180.00, 'Fiery house-special hot sauce dip.', 1],
        ];

        for (const addon of initialAddons) {
          await conn.query(
            'INSERT INTO item_addons (item_id, addon_name, price, description, is_active) VALUES (?, ?, ?, ?, ?)',
            addon
          );
        }
        console.log(`Seeded ${initialAddons.length} initial item addons linked to real items.`);
      }
    }
  } finally {
    await conn.end();
  }
}

migrate().catch(console.error);
