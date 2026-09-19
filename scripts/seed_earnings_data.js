const mysql = require("mysql2/promise");

const SEED_ORDERS = [
  {
    order_number: "GD-ORD-23588",
    operating_mode: "DINE_IN",
    outlet_id: 1,
    table_id: 1,
    customer_mobile: "0772345678",
    guest_name: "Walk-in Customer",
    order_status: "COMPLETED",
    subtotal_amount: 30.00,
    sc_amount: 3.00,
    vat_amount: 1.50,
    net_payable: 34.50,
    payment_method: "Credit Card",
    payment_status: "SETTLED",
    date: "2026-09-19 11:30:00"
  },
  {
    order_number: "GD-ORD-23587",
    operating_mode: "OUTLET_COUNTER",
    outlet_id: 1,
    table_id: null,
    customer_mobile: "0773456789",
    guest_name: "Sue Allen",
    order_status: "COMPLETED",
    subtotal_amount: 70.00,
    sc_amount: 5.00,
    vat_amount: 3.20,
    net_payable: 78.20,
    payment_method: "Cash",
    payment_status: "SETTLED",
    date: "2026-09-19 10:15:00"
  },
  {
    order_number: "GD-ORD-23586",
    operating_mode: "DINE_IN",
    outlet_id: 1,
    table_id: 3,
    customer_mobile: "0774567890",
    guest_name: "Frank Barrett",
    order_status: "COMPLETED",
    subtotal_amount: 40.00,
    sc_amount: 3.50,
    vat_amount: 1.60,
    net_payable: 45.10,
    payment_method: "PayPal",
    payment_status: "SETTLED",
    date: "2026-09-18 20:45:00"
  },
  {
    order_number: "GD-ORD-23585",
    operating_mode: "OUTLET_COUNTER",
    outlet_id: 1,
    table_id: null,
    customer_mobile: "0775678901",
    guest_name: "Kelley Davis",
    order_status: "COMPLETED",
    subtotal_amount: 82.00,
    sc_amount: 6.80,
    vat_amount: 4.00,
    net_payable: 92.80,
    payment_method: "Credit Card",
    payment_status: "SETTLED",
    date: "2026-09-18 19:10:00"
  },
  {
    order_number: "GD-ORD-23584",
    operating_mode: "DINE_IN",
    outlet_id: 1,
    table_id: 5,
    customer_mobile: "0776789012",
    guest_name: "Jim Vickers",
    order_status: "COMPLETED",
    subtotal_amount: 110.00,
    sc_amount: 10.00,
    vat_amount: 5.50,
    net_payable: 125.50,
    payment_method: "Cash",
    payment_status: "SETTLED",
    date: "2026-09-18 13:20:00"
  },
  {
    order_number: "GD-ORD-23583",
    operating_mode: "ROOM_DELIVERY",
    outlet_id: 1,
    table_id: null,
    customer_mobile: "0777890123",
    guest_name: "Sarah Jenkins",
    order_status: "COMPLETED",
    subtotal_amount: 145.00,
    sc_amount: 14.50,
    vat_amount: 8.00,
    net_payable: 167.50,
    payment_method: "Room Charge",
    payment_status: "SETTLED",
    date: "2026-09-17 21:05:00"
  },
  {
    order_number: "GD-ORD-23582",
    operating_mode: "DINE_IN",
    outlet_id: 1,
    table_id: 2,
    customer_mobile: "0778901234",
    guest_name: "Michael Chang",
    order_status: "COMPLETED",
    subtotal_amount: 52.00,
    sc_amount: 5.20,
    vat_amount: 2.60,
    net_payable: 59.80,
    payment_method: "Credit Card",
    payment_status: "SETTLED",
    date: "2026-09-17 18:40:00"
  },
  {
    order_number: "GD-ORD-23581",
    operating_mode: "OUTLET_COUNTER",
    outlet_id: 1,
    table_id: null,
    customer_mobile: "0779012345",
    guest_name: "Walk-in Customer",
    order_status: "COMPLETED",
    subtotal_amount: 22.00,
    sc_amount: 2.00,
    vat_amount: 1.10,
    net_payable: 25.10,
    payment_method: "Cash",
    payment_status: "SETTLED",
    date: "2026-09-17 12:15:00"
  },
  {
    order_number: "GD-ORD-23580",
    operating_mode: "BANQUET_EVENT",
    outlet_id: 1,
    table_id: null,
    customer_mobile: "0770123456",
    guest_name: "Dilara Corporate Group",
    order_status: "COMPLETED",
    subtotal_amount: 420.00,
    sc_amount: 42.00,
    vat_amount: 21.00,
    net_payable: 483.00,
    payment_method: "Bank Transfer",
    payment_status: "SETTLED",
    date: "2026-09-16 19:30:00"
  },
  {
    order_number: "GD-ORD-23579",
    operating_mode: "DINE_IN",
    outlet_id: 1,
    table_id: 4,
    customer_mobile: "0771122334",
    guest_name: "Elena Rostova",
    order_status: "COMPLETED",
    subtotal_amount: 88.00,
    sc_amount: 8.80,
    vat_amount: 4.40,
    net_payable: 101.20,
    payment_method: "Credit Card",
    payment_status: "SETTLED",
    date: "2026-09-16 14:00:00"
  }
];

async function seedEarnings() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "162.215.13.177",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "dsschool_hom",
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "Welcome@hom",
    database: process.env.DB_NAME || "dsschool_hom",
  });

  console.log("Connected to MySQL for seeding earnings data...");

  try {
    for (const ord of SEED_ORDERS) {
      // Check if order number already exists
      const [existing] = await connection.query(
        "SELECT order_id FROM orders WHERE order_number = ?",
        [ord.order_number]
      );

      let orderId;
      if (existing.length > 0) {
        orderId = existing[0].order_id;
        await connection.execute(
          `UPDATE orders 
           SET net_payable = ?, order_status = ?, customer_mobile = ?, created_at = ?
           WHERE order_id = ?`,
          [ord.net_payable, ord.order_status, ord.customer_mobile, ord.date, orderId]
        );
      } else {
        const trackingToken = require("crypto").randomBytes(16).toString("hex");
        const [res] = await connection.execute(
          `INSERT INTO orders 
             (order_number, operating_mode, outlet_id, table_id, customer_mobile, tracking_token, order_status, subtotal_amount, sc_amount, vat_amount, net_payable, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            ord.order_number,
            ord.operating_mode,
            ord.outlet_id,
            ord.table_id,
            ord.customer_mobile,
            trackingToken,
            ord.order_status,
            ord.subtotal_amount,
            ord.sc_amount,
            ord.vat_amount,
            ord.net_payable,
            ord.date
          ]
        );
        orderId = res.insertId;
      }

      // Check / upsert payments record
      const [payExists] = await connection.query(
        "SELECT payment_id FROM payments WHERE order_id = ?",
        [orderId]
      );

      if (payExists.length > 0) {
        await connection.execute(
          `UPDATE payments 
           SET payment_method = ?, payable_amount = ?, tendered_amount = ?, guest_name = ?, payment_status = ?, created_at = ?
           WHERE payment_id = ?`,
          [ord.payment_method, ord.net_payable, ord.net_payable, ord.guest_name, ord.payment_status, ord.date, payExists[0].payment_id]
        );
      } else {
        await connection.execute(
          `INSERT INTO payments 
             (order_id, payment_method, payable_amount, tendered_amount, change_amount, guest_name, payment_status, created_at)
           VALUES (?, ?, ?, ?, 0, ?, ?, ?)`,
          [orderId, ord.payment_method, ord.net_payable, ord.net_payable, ord.guest_name, ord.payment_status, ord.date]
        );
      }

      console.log(`Seeded order ${ord.order_number} (Order ID: ${orderId}, Guest: ${ord.guest_name}, Total: $${ord.net_payable})`);
    }

    console.log("Successfully seeded rich earnings transactions!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await connection.end();
  }
}

seedEarnings();
