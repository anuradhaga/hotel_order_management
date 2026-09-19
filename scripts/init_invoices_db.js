const mysql = require('mysql2/promise');

async function initInvoicesDb() {
  const conn = await mysql.createConnection({
    host: '162.215.13.177',
    port: 3306,
    user: 'dsschool_hom',
    password: 'Welcome@hom',
    database: 'dsschool_hom',
  });

  console.log('Connected to MySQL for Invoices DB setup.');

  // 1. Create invoices table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`invoices\` (
      \`invoice_id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`invoice_number\` VARCHAR(50) NOT NULL UNIQUE,
      \`order_id\` INT NULL,
      \`customer_name\` VARCHAR(150) NOT NULL,
      \`customer_image\` VARCHAR(100) DEFAULT 'avatar-32.jpg',
      \`customer_email\` VARCHAR(150) NULL,
      \`customer_phone\` VARCHAR(50) NULL,
      \`customer_address\` VARCHAR(255) NULL,
      \`invoice_date\` DATETIME NOT NULL,
      \`order_type\` VARCHAR(50) NOT NULL DEFAULT 'Dine In',
      \`subtotal\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      \`discount\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      \`tax_amount\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      \`total_amount\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      \`status\` VARCHAR(20) NOT NULL DEFAULT 'Paid',
      \`payment_method\` VARCHAR(50) DEFAULT 'Cash',
      \`notes\` TEXT NULL,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_inv_customer (\`customer_name\`),
      INDEX idx_inv_date (\`invoice_date\`),
      INDEX idx_inv_status (\`status\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `);
  console.log('Verified `invoices` table.');

  // 2. Create invoice_items table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`invoice_items\` (
      \`item_id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`invoice_id\` INT NOT NULL,
      \`item_name\` VARCHAR(150) NOT NULL,
      \`quantity\` INT NOT NULL DEFAULT 1,
      \`rate\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      \`amount\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\` (\`invoice_id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `);
  console.log('Verified `invoice_items` table.');

  // 3. Seed initial template invoices matching the user screenshot
  const initialInvoices = [
    {
      invoice_number: '#INV0016',
      customer_name: 'Adrian James',
      customer_image: 'avatar-32.jpg',
      customer_email: 'adrian@example.com',
      customer_phone: '+1 987 654 3210',
      customer_address: '15 Hodges Mews, High Wycombe HP12 3JL, UK',
      invoice_date: '2025-11-01 12:30:00',
      order_type: 'Dine In',
      subtotal: 920.00,
      discount: 0.00,
      tax_amount: 80.00,
      total_amount: 1000.00,
      status: 'Paid',
      payment_method: 'Cash',
      items: [
        { item_name: 'Grilled Salmon Steak', quantity: 2, rate: 350.00, amount: 700.00 },
        { item_name: 'Mediterranean Salad Bowl', quantity: 1, rate: 120.00, amount: 120.00 },
        { item_name: 'Fresh Coconut Refresher', quantity: 2, rate: 50.00, amount: 100.00 },
      ]
    },
    {
      invoice_number: '#INV0015',
      customer_name: 'Sue Allen',
      customer_image: 'avatar-33.jpg',
      customer_email: 'sue@example.com',
      customer_phone: '+1 67890 12345',
      customer_address: '42 Baker Street, London NW1 6XE, UK',
      invoice_date: '2025-09-04 14:15:00',
      order_type: 'Take Away',
      subtotal: 1380.00,
      discount: 30.00,
      tax_amount: 150.00,
      total_amount: 1500.00,
      status: 'Paid',
      payment_method: 'Credit Card',
      items: [
        { item_name: 'Black Angus Prime Ribeye (400g)', quantity: 2, rate: 550.00, amount: 1100.00 },
        { item_name: 'Truffle Parmesan Fries', quantity: 2, rate: 140.00, amount: 280.00 },
      ]
    },
    {
      invoice_number: '#INV0014',
      customer_name: 'Frank Barrett',
      customer_image: 'avatar-34.jpg',
      customer_email: 'frank@example.com',
      customer_phone: '+1 23456 78901',
      customer_address: '77 Oxford Road, Manchester M1 7ED, UK',
      invoice_date: '2025-08-18 19:45:00',
      order_type: 'Delivery',
      subtotal: 1100.00,
      discount: 0.00,
      tax_amount: 100.00,
      total_amount: 1200.00,
      status: 'Paid',
      payment_method: 'PayPal',
      items: [
        { item_name: 'Seafood Marinara Linguine', quantity: 2, rate: 380.00, amount: 760.00 },
        { item_name: 'Bruschetta Trio & Garlic Bread', quantity: 2, rate: 170.00, amount: 340.00 },
      ]
    },
    {
      invoice_number: '#INV0013',
      customer_name: 'Kelley Davis',
      customer_image: 'avatar-35.jpg',
      customer_email: 'kelley@example.com',
      customer_phone: '+1 56789 23456',
      customer_address: '10 Queen Square, Bristol BS1 4NT, UK',
      invoice_date: '2025-07-10 13:00:00',
      order_type: 'Dine In',
      subtotal: 740.00,
      discount: 0.00,
      tax_amount: 60.00,
      total_amount: 800.00,
      status: 'Paid',
      payment_method: 'Credit Card',
      items: [
        { item_name: 'Crispy Calamari with Garlic Aioli', quantity: 2, rate: 250.00, amount: 500.00 },
        { item_name: 'Signature Passionfruit Mocktail', quantity: 2, rate: 120.00, amount: 240.00 },
      ]
    },
    {
      invoice_number: '#INV0012',
      customer_name: 'Jim Vickers',
      customer_image: 'avatar-36.jpg',
      customer_email: 'jim@example.com',
      customer_phone: '+1 78912 34567',
      customer_address: '88 George Street, Edinburgh EH2 3BU, UK',
      invoice_date: '2025-06-05 18:20:00',
      order_type: 'Delivery',
      subtotal: 690.00,
      discount: 0.00,
      tax_amount: 60.00,
      total_amount: 750.00,
      status: 'Paid',
      payment_method: 'Cash',
      items: [
        { item_name: 'Smoked BBQ Beef Burger', quantity: 2, rate: 240.00, amount: 480.00 },
        { item_name: 'Cajun Seasoned Wedges', quantity: 1, rate: 110.00, amount: 110.00 },
        { item_name: 'Craft Ginger Beer', quantity: 2, rate: 50.00, amount: 100.00 },
      ]
    },
    {
      invoice_number: '#INV0011',
      customer_name: 'Nancy Chapman',
      customer_image: 'avatar-37.jpg',
      customer_email: 'nancy@example.com',
      customer_phone: '+1 89012 45678',
      customer_address: '25 Park Lane, Leeds LS1 2TW, UK',
      invoice_date: '2025-05-03 12:40:00',
      order_type: 'Dine In',
      subtotal: 1200.00,
      discount: 0.00,
      tax_amount: 100.00,
      total_amount: 1300.00,
      status: 'Paid',
      payment_method: 'Credit Card',
      items: [
        { item_name: 'Lobster Bisque & Warm Baguette', quantity: 2, rate: 420.00, amount: 840.00 },
        { item_name: 'Roasted Beetroot Salad', quantity: 2, rate: 180.00, amount: 360.00 },
      ]
    },
    {
      invoice_number: '#INV0010',
      customer_name: 'Ron Jude',
      customer_image: 'avatar-38.jpg',
      customer_email: 'ron@example.com',
      customer_phone: '+1 90123 56789',
      customer_address: '14 High Street, Southampton SO14 2DF, UK',
      invoice_date: '2025-04-15 15:10:00',
      order_type: 'Take Away',
      subtotal: 1020.00,
      discount: 20.00,
      tax_amount: 100.00,
      total_amount: 1100.00,
      status: 'Paid',
      payment_method: 'Cash',
      items: [
        { item_name: 'Butter Chicken Masala & Garlic Naan', quantity: 2, rate: 360.00, amount: 720.00 },
        { item_name: 'Vegetable Spring Rolls', quantity: 2, rate: 150.00, amount: 300.00 },
      ]
    },
    {
      invoice_number: '#INV0009',
      customer_name: 'Elena Rostova',
      customer_image: 'avatar-39.jpg',
      customer_email: 'elena@example.com',
      customer_phone: '+1 89012 34567',
      customer_address: '33 Castle Terrace, Aberdeen AB10 1EU, UK',
      invoice_date: '2025-03-22 19:30:00',
      order_type: 'Dine In',
      subtotal: 890.00,
      discount: 0.00,
      tax_amount: 70.00,
      total_amount: 960.00,
      status: 'Paid',
      payment_method: 'Credit Card',
      items: [
        { item_name: 'Wild Mushroom Risotto', quantity: 2, rate: 320.00, amount: 640.00 },
        { item_name: 'Tiramisu Della Casa', quantity: 2, rate: 125.00, amount: 250.00 },
      ]
    },
    {
      invoice_number: '#INV0008',
      customer_name: 'Dilara Corporate Group',
      customer_image: 'avatar-40.jpg',
      customer_email: 'corporate@dilara.com',
      customer_phone: '+1 90123 45678',
      customer_address: 'Tower 4, Canary Wharf, London E14 5AB, UK',
      invoice_date: '2025-02-14 13:00:00',
      order_type: 'Delivery',
      subtotal: 2150.00,
      discount: 150.00,
      tax_amount: 200.00,
      total_amount: 2200.00,
      status: 'Paid',
      payment_method: 'Bank Transfer',
      items: [
        { item_name: 'Executive Banquet Platter', quantity: 4, rate: 450.00, amount: 1800.00 },
        { item_name: 'Artisan Fruit & Cheese Board', quantity: 2, rate: 175.00, amount: 350.00 },
      ]
    }
  ];

  for (const inv of initialInvoices) {
    const [exist] = await conn.execute(
      'SELECT invoice_id FROM invoices WHERE invoice_number = ?',
      [inv.invoice_number]
    );

    let invoiceId;
    if (exist.length > 0) {
      invoiceId = exist[0].invoice_id;
      await conn.execute(
        `UPDATE invoices SET 
          customer_name = ?, customer_image = ?, customer_email = ?, customer_phone = ?,
          customer_address = ?, invoice_date = ?, order_type = ?, subtotal = ?,
          discount = ?, tax_amount = ?, total_amount = ?, status = ?, payment_method = ?
         WHERE invoice_id = ?`,
        [
          inv.customer_name, inv.customer_image, inv.customer_email, inv.customer_phone,
          inv.customer_address, inv.invoice_date, inv.order_type, inv.subtotal,
          inv.discount, inv.tax_amount, inv.total_amount, inv.status, inv.payment_method,
          invoiceId
        ]
      );
      // delete existing items to re-insert
      await conn.execute('DELETE FROM invoice_items WHERE invoice_id = ?', [invoiceId]);
    } else {
      const [insertRes] = await conn.execute(
        `INSERT INTO invoices 
          (invoice_number, customer_name, customer_image, customer_email, customer_phone, customer_address, invoice_date, order_type, subtotal, discount, tax_amount, total_amount, status, payment_method)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inv.invoice_number, inv.customer_name, inv.customer_image, inv.customer_email, inv.customer_phone,
          inv.customer_address, inv.invoice_date, inv.order_type, inv.subtotal,
          inv.discount, inv.tax_amount, inv.total_amount, inv.status, inv.payment_method
        ]
      );
      invoiceId = insertRes.insertId;
    }

    // Insert items
    for (const item of inv.items) {
      await conn.execute(
        'INSERT INTO invoice_items (invoice_id, item_name, quantity, rate, amount) VALUES (?, ?, ?, ?, ?)',
        [invoiceId, item.item_name, item.quantity, item.rate, item.amount]
      );
    }
  }

  console.log(`Successfully initialized and seeded ${initialInvoices.length} invoices with detailed line items!`);
  await conn.end();
}

initInvoicesDb().catch(console.error);
