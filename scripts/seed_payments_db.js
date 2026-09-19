const mysql = require('mysql2/promise');

async function seedPayments() {
  const conn = await mysql.createConnection({
    host: '162.215.13.177',
    port: 3306,
    user: 'dsschool_hom',
    password: 'Welcome@hom',
    database: 'dsschool_hom',
  });

  console.log('Connected to MySQL to seed and align payments data.');

  // The transactions from the user screenshot:
  const transactions = [
    {
      order_number: 'GD-ORD-23588',
      transaction_id: '#23588',
      order_id_code: '#57005',
      token_no: '16',
      customer_name: 'Adrian James',
      order_type: 'DINE_IN',
      display_type: 'Dine In',
      menus: 3,
      amount: 34.50,
      payment_method: 'Cash',
      status: 'SETTLED',
      created_at: '2025-11-01 12:30:00'
    },
    {
      order_number: 'GD-ORD-23587',
      transaction_id: '#23587',
      order_id_code: '#57004',
      token_no: '15',
      customer_name: 'Sue Allen',
      order_type: 'OUTLET_COUNTER',
      display_type: 'Take Away',
      menus: 7,
      amount: 78.20,
      payment_method: 'Credit Card',
      status: 'SETTLED',
      created_at: '2025-10-24 14:15:00'
    },
    {
      order_number: 'GD-ORD-23586',
      transaction_id: '#23586',
      order_id_code: '#57003',
      token_no: '14',
      customer_name: 'Frank Barrett',
      order_type: 'ROOM_DELIVERY',
      display_type: 'Delivery',
      menus: 4,
      amount: 45.10,
      payment_method: 'PayPal',
      status: 'SETTLED',
      created_at: '2025-10-18 19:45:00'
    },
    {
      order_number: 'GD-ORD-23585',
      transaction_id: '#23585',
      order_id_code: '#57002',
      token_no: '13',
      customer_name: 'Kelley Davis',
      order_type: 'DINE_IN',
      display_type: 'Dine In',
      menus: 9,
      amount: 92.80,
      payment_method: 'Credit Card',
      status: 'SETTLED',
      created_at: '2025-10-10 13:00:00'
    },
    {
      order_number: 'GD-ORD-23584',
      transaction_id: '#23584',
      order_id_code: '#57001',
      token_no: '12',
      customer_name: 'Jim Vickers',
      order_type: 'ROOM_DELIVERY',
      display_type: 'Delivery',
      menus: 6,
      amount: 61.40,
      payment_method: 'Cash',
      status: 'SETTLED',
      created_at: '2025-10-05 18:20:00'
    },
    {
      order_number: 'GD-ORD-23583',
      transaction_id: '#23583',
      order_id_code: '#57000',
      token_no: '11',
      customer_name: 'Nancy Chapman',
      order_type: 'DINE_IN',
      display_type: 'Dine In',
      menus: 5,
      amount: 57.20,
      payment_method: 'Credit Card',
      status: 'SETTLED',
      created_at: '2025-09-28 12:40:00'
    },
    {
      order_number: 'GD-ORD-23582',
      transaction_id: '#23582',
      order_id_code: '#56999',
      token_no: '10',
      customer_name: 'Ron Jude',
      order_type: 'OUTLET_COUNTER',
      display_type: 'Take Away',
      menus: 4,
      amount: 45.30,
      payment_method: 'Cash',
      status: 'SETTLED',
      created_at: '2025-09-15 15:10:00'
    },
    {
      order_number: 'GD-ORD-23581',
      transaction_id: '#23581',
      order_id_code: '#56998',
      token_no: '09',
      customer_name: 'Elena Rostova',
      order_type: 'DINE_IN',
      display_type: 'Dine In',
      menus: 3,
      amount: 101.20,
      payment_method: 'Credit Card',
      status: 'SETTLED',
      created_at: '2025-09-08 19:30:00'
    },
    {
      order_number: 'GD-ORD-23580',
      transaction_id: '#23580',
      order_id_code: '#56997',
      token_no: '08',
      customer_name: 'Dilara Corporate Group',
      order_type: 'ROOM_DELIVERY',
      display_type: 'Delivery',
      menus: 8,
      amount: 483.00,
      payment_method: 'Bank Transfer',
      status: 'SETTLED',
      created_at: '2025-08-22 13:00:00'
    },
    {
      order_number: 'GD-ORD-23579',
      transaction_id: '#23579',
      order_id_code: '#56996',
      token_no: '07',
      customer_name: 'Walkin Customer',
      order_type: 'OUTLET_COUNTER',
      display_type: 'Take Away',
      menus: 2,
      amount: 25.10,
      payment_method: 'Cash',
      status: 'SETTLED',
      created_at: '2025-08-14 11:15:00'
    }
  ];

  for (const t of transactions) {
    // Check if order exists
    const [existingOrders] = await conn.execute(
      'SELECT order_id FROM orders WHERE order_number = ?',
      [t.order_number]
    );

    let orderId;
    if (existingOrders.length > 0) {
      orderId = existingOrders[0].order_id;
      await conn.execute(
        `UPDATE orders SET 
          operating_mode = ?, pickup_token = ?, net_payable = ?, subtotal_amount = ?, created_at = ?
         WHERE order_id = ?`,
        [t.order_type, t.token_no, t.amount, t.amount, t.created_at, orderId]
      );
    } else {
      const [newOrder] = await conn.execute(
        `INSERT INTO orders 
          (order_number, operating_mode, outlet_id, pickup_token, order_status, subtotal_amount, net_payable, guest_count, created_at)
         VALUES (?, ?, 1, ?, 'COMPLETED', ?, ?, 1, ?)`,
        [t.order_number, t.order_type, t.token_no, t.amount, t.amount, t.created_at]
      );
      orderId = newOrder.insertId;
    }

    // Check if payment exists for this order
    const [existingPayments] = await conn.execute(
      'SELECT payment_id FROM payments WHERE order_id = ?',
      [orderId]
    );

    if (existingPayments.length > 0) {
      await conn.execute(
        `UPDATE payments SET 
          payment_method = ?, payable_amount = ?, tendered_amount = ?, guest_name = ?, payment_status = ?, created_at = ?
         WHERE payment_id = ?`,
        [t.payment_method, t.amount, t.amount, t.customer_name, t.status, t.created_at, existingPayments[0].payment_id]
      );
    } else {
      await conn.execute(
        `INSERT INTO payments 
          (order_id, payment_method, payable_amount, tendered_amount, guest_name, payment_status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orderId, t.payment_method, t.amount, t.amount, t.customer_name, t.status, t.created_at]
      );
    }
  }

  console.log(`Synced ${transactions.length} payment records!`);
  await conn.end();
}

seedPayments().catch(console.error);
