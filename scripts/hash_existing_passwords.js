const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const BCRYPT_SALT_ROUNDS = 12;

function isBcryptHash(str) {
  if (!str || typeof str !== "string") return false;
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(str);
}

async function migratePasswords() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "162.215.13.177",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "dsschool_hom",
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "Welcome@hom",
    database: process.env.DB_NAME || "dsschool_hom",
  });

  console.log("Connected to MySQL database.");

  try {
    const [users] = await connection.query(
      "SELECT user_id, username, password_hash FROM users"
    );

    console.log(`Found ${users.length} users in database.`);

    for (const u of users) {
      if (isBcryptHash(u.password_hash)) {
        console.log(`[SKIPPED] User '${u.username}' (ID: ${u.user_id}) already has a secure bcrypt hash.`);
        continue;
      }

      const plainText = u.password_hash;
      console.log(`[HASHING] User '${u.username}' (ID: ${u.user_id}) has plain-text password. Hashing with bcrypt (rounds: ${BCRYPT_SALT_ROUNDS})...`);

      const hash = await bcrypt.hash(plainText, BCRYPT_SALT_ROUNDS);

      await connection.execute(
        "UPDATE users SET password_hash = ? WHERE user_id = ?",
        [hash, u.user_id]
      );

      console.log(`[SUCCESS] User '${u.username}' password_hash updated to secure bcrypt hash: ${hash.substring(0, 15)}...`);
    }

    console.log("\nAll user passwords in database are now secured with bcrypt (12 rounds)!");
  } catch (err) {
    console.error("Error migrating passwords:", err);
  } finally {
    await connection.end();
  }
}

migratePasswords();
