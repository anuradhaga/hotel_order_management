import mysql from "mysql2/promise";

const currentHost = process.env.DB_HOST || "162.215.13.177";
const currentDb = process.env.DB_NAME || "dsschool_hom";

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
  // eslint-disable-next-line no-var
  var __mysqlPoolHost: string | undefined;
}

if (global.__mysqlPool && global.__mysqlPoolHost !== currentHost) {
  try {
    global.__mysqlPool.end();
  } catch (e) {}
  global.__mysqlPool = undefined;
}

const pool =
  global.__mysqlPool ||
  mysql.createPool({
    host: currentHost,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "dsschool_hom",
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "Welcome@hom",
    database: currentDb,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    decimalNumbers: true,
  });

if (process.env.NODE_ENV !== "production") {
  global.__mysqlPool = pool;
  global.__mysqlPoolHost = currentHost;
}

export default pool;

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}
