const mysql = require('mysql2/promise');

async function migrate() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '162.215.13.177',
    user: process.env.DB_USER || 'dsschool_hom',
    password: process.env.DB_PASSWORD || 'Welcome@hom',
    database: process.env.DB_NAME || 'dsschool_hom'
  });

  try {
    const [itemsCols] = await conn.query("SHOW COLUMNS FROM items LIKE 'item_size'");
    if (itemsCols.length === 0) {
      await conn.query("ALTER TABLE items ADD COLUMN item_size VARCHAR(50) NOT NULL DEFAULT 'Regular' AFTER item_name");
      console.log('Added item_size column to items table');
    } else {
      console.log('item_size column already exists in items table');
    }

    const [pricesCols] = await conn.query("SHOW COLUMNS FROM item_prices LIKE 'size_name'");
    if (pricesCols.length === 0) {
      await conn.query("ALTER TABLE item_prices ADD COLUMN size_name VARCHAR(50) NOT NULL DEFAULT 'Regular' AFTER selling_price");
      console.log('Added size_name column to item_prices table');
    } else {
      console.log('size_name column already exists in item_prices table');
    }
  } finally {
    await conn.end();
  }
}

migrate().catch(console.error);
