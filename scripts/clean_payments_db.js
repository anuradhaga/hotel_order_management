const mysql = require('mysql2/promise');

async function cleanAndAlign() {
  const conn = await mysql.createConnection({
    host: '162.215.13.177',
    port: 3306,
    user: 'dsschool_hom',
    password: 'Welcome@hom',
    database: 'dsschool_hom',
  });

  console.log('Connected to MySQL to clean duplicate orders & payments.');

  // The exact 7 records from user screenshot:
  const exact = [
    { tx: '23588', ordNum: 'GD-ORD-23588', ord: '#57005', token: '16', cust: 'Adrian James', type: 'DINE_IN', amt: 34.50 },
    { tx: '23587', ordNum: 'GD-ORD-23587', ord: '#57004', token: '15', cust: 'Sue Allen', type: 'OUTLET_COUNTER', amt: 78.20 },
    { tx: '23586', ordNum: 'GD-ORD-23586', ord: '#57003', token: '14', cust: 'Frank Barrett', type: 'ROOM_DELIVERY', amt: 45.10 },
    { tx: '23585', ordNum: 'GD-ORD-23585', ord: '#57002', token: '13', cust: 'Kelley Davis', type: 'DINE_IN', amt: 92.80 },
    { tx: '23584', ordNum: 'GD-ORD-23584', ord: '#57001', token: '12', cust: 'Jim Vickers', type: 'ROOM_DELIVERY', amt: 61.40 },
    { tx: '23583', ordNum: 'GD-ORD-23583', ord: '#57000', token: '11', cust: 'Nancy Chapman', type: 'DINE_IN', amt: 57.20 },
    { tx: '23582', ordNum: 'GD-ORD-23582', ord: '#56999', token: '10', cust: 'Ron Jude', type: 'OUTLET_COUNTER', amt: 45.30 },
  ];

  // First delete any orders with -2025 suffix that duplicate the core 2358X transactions:
  for (const item of exact) {
    const [dups] = await conn.execute(
      'SELECT order_id FROM orders WHERE order_number LIKE ?',
      [`%${item.tx}%`]
    );
    if (dups.length > 1) {
      // Keep only the first order_id, delete others from payments and orders
      const keepId = dups[0].order_id;
      for (let i = 1; i < dups.length; i++) {
        const delId = dups[i].order_id;
        await conn.execute('DELETE FROM payments WHERE order_id = ?', [delId]);
        await conn.execute('DELETE FROM order_items WHERE order_id = ?', [delId]);
        await conn.execute('DELETE FROM orders WHERE order_id = ?', [delId]);
      }
    }

    // Now update the single order and payment:
    const [single] = await conn.execute(
      'SELECT order_id FROM orders WHERE order_number LIKE ?',
      [`%${item.tx}%`]
    );
    if (single.length > 0) {
      const oId = single[0].order_id;
      await conn.execute(
        'UPDATE orders SET order_number = ?, operating_mode = ?, pickup_token = ?, net_payable = ?, subtotal_amount = ? WHERE order_id = ?',
        [item.ordNum, item.type, item.token, item.amt, item.amt, oId]
      );
      await conn.execute(
        'UPDATE payments SET guest_name = ?, payable_amount = ?, tendered_amount = ?, payment_status = "SETTLED" WHERE order_id = ?',
        [item.cust, item.amt, item.amt, oId]
      );
    }
  }

  console.log('Cleaned and harmonized exact payment rows!');
  await conn.end();
}

cleanAndAlign().catch(console.error);
