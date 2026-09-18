import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

const pool =
  global.__mysqlPool ||
  mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "dsschool_hom",
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "Welcome@hom",
    database: process.env.DB_NAME || "dsschool_hom",
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    decimalNumbers: true,
  });

if (process.env.NODE_ENV !== "production") {
  global.__mysqlPool = pool;
}

export default pool;

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}
