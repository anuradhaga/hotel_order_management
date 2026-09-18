const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  console.log('Connecting to MySQL on 127.0.0.1:3306...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  const sqlPath = path.join(__dirname, 'init_db.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Executing database schema and seed script...');
  await connection.query(sql);
  console.log('Successfully initialized hotel_order_management database with all tables and seed data!');

  await connection.end();
}

main().catch(err => {
  console.error('Database initialization error:', err);
  process.exit(1);
});
