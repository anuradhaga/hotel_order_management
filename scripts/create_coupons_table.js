import pool from "../src/lib/db.ts";

async function createCouponsTable() {
  console.log("Checking and creating `coupons` table in database...");

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS coupons (
      coupon_id INT AUTO_INCREMENT PRIMARY KEY,
      coupon_code VARCHAR(50) NOT NULL UNIQUE,
      category_id INT NULL,
      discount_type ENUM('Percentage', 'Fixed Amount') NOT NULL DEFAULT 'Percentage',
      discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_coupons_category FOREIGN KEY (category_id) REFERENCES item_categories(category_id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableSql);
  console.log("Table `coupons` created or already exists.");

  // Check if rows already exist
  const [existing] = await pool.query("SELECT COUNT(*) AS cnt FROM coupons");
  if (existing[0]?.cnt > 0) {
    console.log(`Table \`coupons\` already contains ${existing[0].cnt} rows.`);
    process.exit(0);
  }

  // Seed sample coupons
  const seedCoupons = [
    {
      coupon_code: "SEAFOOD10",
      category_id: 7, // Sea Food
      discount_type: "Percentage",
      discount_amount: 10.00,
      start_date: "2025-01-01",
      end_date: "2025-12-31",
      is_active: 1,
    },
    {
      coupon_code: "PIZZA20",
      category_id: 3, // Pizza
      discount_type: "Fixed Amount",
      discount_amount: 200.00,
      start_date: "2025-02-15",
      end_date: "2025-11-20",
      is_active: 1,
    },
    {
      coupon_code: "SALAD15",
      category_id: 8, // Salads
      discount_type: "Percentage",
      discount_amount: 15.00,
      start_date: "2025-03-22",
      end_date: "2025-11-25",
      is_active: 1,
    },
    {
      coupon_code: "TACO5",
      category_id: 9, // Tacos
      discount_type: "Fixed Amount",
      discount_amount: 50.00,
      start_date: "2025-04-15",
      end_date: "2025-10-10",
      is_active: 0, // Expired
    },
    {
      coupon_code: "WEEKEND25",
      category_id: null, // All Categories
      discount_type: "Percentage",
      discount_amount: 25.00,
      start_date: "2025-05-03",
      end_date: "2025-11-13",
      is_active: 1,
    },
    {
      coupon_code: "COMBO50",
      category_id: 1, // Starters & Appetizers
      discount_type: "Percentage",
      discount_amount: 5.00,
      start_date: "2025-06-05",
      end_date: "2025-12-20",
      is_active: 1,
    },
    {
      coupon_code: "HOLIDAY30",
      category_id: null, // All Categories
      discount_type: "Fixed Amount",
      discount_amount: 300.00,
      start_date: "2025-07-10",
      end_date: "2025-12-15",
      is_active: 1,
    },
    {
      coupon_code: "SWEET10",
      category_id: 14, // Desserts
      discount_type: "Fixed Amount",
      discount_amount: 100.00,
      start_date: "2025-08-18",
      end_date: "2025-12-25",
      is_active: 1,
    },
    {
      coupon_code: "FAMILYFEAST",
      category_id: null, // All Categories
      discount_type: "Fixed Amount",
      discount_amount: 500.00,
      start_date: "2024-09-04",
      end_date: "2024-10-10",
      is_active: 0, // Expired
    },
    {
      coupon_code: "FIRSTORDER",
      category_id: null, // All Categories
      discount_type: "Fixed Amount",
      discount_amount: 250.00,
      start_date: "2025-11-01",
      end_date: "2025-12-31",
      is_active: 1,
    },
  ];

  for (const c of seedCoupons) {
    await pool.query(
      `INSERT INTO coupons 
        (coupon_code, category_id, discount_type, discount_amount, start_date, end_date, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        c.coupon_code,
        c.category_id,
        c.discount_type,
        c.discount_amount,
        c.start_date,
        c.end_date,
        c.is_active,
      ]
    );
  }

  console.log(`Seeded ${seedCoupons.length} coupons successfully.`);
  process.exit(0);
}

createCouponsTable().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
