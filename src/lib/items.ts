import pool from "@/lib/db";

export interface GetItemsOptions {
  page?: number;
  pageSize?: number;
  search?: string | null;
  category_id?: string | number | null;
  status?: string | null;
  is_vegetarian?: string | number | null;
  sortBy?: string | null;
}

export async function getItemsServerData(options: GetItemsOptions = {}) {
  const page = Math.max(1, Number(options.page) || 1);
  const pageSize = Math.max(1, Number(options.pageSize) || 20);
  const offset = (page - 1) * pageSize;

  const search = options.search;
  const category_id = options.category_id;
  const status = options.status;
  const is_vegetarian = options.is_vegetarian;
  const sortBy = options.sortBy || "id_asc";

  const conditions: string[] = [];
  const params: any[] = [];

  if (status && status !== "all") {
    const activeVal = String(status).toLowerCase() === "active" ? 1 : 0;
    conditions.push("i.is_active = ?");
    params.push(activeVal);
  }

  if (category_id && category_id !== "all") {
    conditions.push("i.category_id = ?");
    params.push(Number(category_id));
  }

  if (is_vegetarian !== null && is_vegetarian !== undefined && is_vegetarian !== "all") {
    conditions.push("i.is_vegetarian = ?");
    params.push(Number(is_vegetarian));
  }

  if (search && String(search).trim()) {
    const term = `%${String(search).trim()}%`;
    conditions.push(
      "(i.item_name LIKE ? OR i.item_code LIKE ? OR c.category_name LIKE ? OR i.description LIKE ?)"
    );
    params.push(term, term, term, term);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // 1. Total count query
  const countQuery = `
    SELECT COUNT(*) as total
    FROM items i
    LEFT JOIN item_categories c ON i.category_id = c.category_id
    ${whereClause}
  `;
  const [countRows]: any[] = await pool.query(countQuery, params);
  const totalCount = Number(countRows[0]?.total || 0);
  const totalPages = Math.ceil(totalCount / pageSize);

  // 2. Sorting
  let orderClause = "ORDER BY i.item_id ASC";
  if (sortBy === "name_asc") {
    orderClause = "ORDER BY i.item_name ASC";
  } else if (sortBy === "name_desc") {
    orderClause = "ORDER BY i.item_name DESC";
  } else if (sortBy === "price_asc") {
    orderClause = "ORDER BY COALESCE(ip.min_price, 0) ASC";
  } else if (sortBy === "price_desc") {
    orderClause = "ORDER BY COALESCE(ip.min_price, 0) DESC";
  } else if (sortBy === "newest") {
    orderClause = "ORDER BY i.created_at DESC";
  } else if (sortBy === "oldest") {
    orderClause = "ORDER BY i.created_at ASC";
  }

  // 3. Paginated items query (using aggregated current prices subquery to prevent row duplication)
  const queryParams = [...params, pageSize, offset];
  const itemsQuery = `
    SELECT 
      i.item_id,
      i.item_id AS id,
      i.item_code,
      i.item_name,
      i.item_name AS item,
      COALESCE(i.item_size, 'Regular') AS item_size,
      i.description,
      i.image_url,
      COALESCE(
        NULLIF(i.image_url, ''), 
        'assets/img/items/default-food.svg'
      ) AS image,
      i.category_id,
      COALESCE(c.category_name, 'General') AS category,
      c.category_name,
      i.kitchen_dept,
      COALESCE(i.is_spicy, 0) AS is_spicy,
      COALESCE(i.is_vegetarian, 0) AS is_vegetarian,
      i.is_active,
      CASE WHEN i.is_active = 1 THEN 'Active' ELSE 'Inactive' END AS status,
      CASE WHEN i.is_active = 1 THEN 'Active' ELSE 'Inactive' END AS Status,
      COALESCE(ip.min_price, 1500.00) AS selling_price,
      COALESCE(ip.min_price, 1500.00) AS price_raw,
      CONCAT('LKR ', FORMAT(COALESCE(ip.min_price, 1500.00), 2)) AS price,
      CONCAT('LKR ', FORMAT(COALESCE(ip.min_price, 1500.00), 2)) AS Price,
      DATE_FORMAT(i.created_at, '%d %b %Y') AS Date,
      DATE_FORMAT(i.created_at, '%Y-%m-%d') AS created_at
    FROM items i
    LEFT JOIN item_categories c ON i.category_id = c.category_id
    LEFT JOIN (
      SELECT item_id, MIN(selling_price) AS min_price, MAX(selling_price) AS max_price
      FROM item_prices
      WHERE is_current = 1
      GROUP BY item_id
    ) ip ON i.item_id = ip.item_id
    ${whereClause}
    ${orderClause}
    LIMIT ? OFFSET ?
  `;

  const [rows]: any[] = await pool.query(itemsQuery, queryParams);

  // 4. Fetch all current sizes & prices for the retrieved items
  if (rows.length > 0) {
    const itemIds = rows.map((r: any) => r.item_id);
    const [priceRows]: any[] = await pool.query(
      `SELECT price_id, item_id, COALESCE(size_name, 'Regular') AS size_name, selling_price
       FROM item_prices
       WHERE item_id IN (?) AND is_current = 1
       ORDER BY selling_price ASC`,
      [itemIds]
    );

    const pricesByItemId = new Map<number, Array<{ price_id?: number; size_name: string; selling_price: number }>>();
    for (const pr of priceRows) {
      if (!pricesByItemId.has(pr.item_id)) {
        pricesByItemId.set(pr.item_id, []);
      }
      pricesByItemId.get(pr.item_id)!.push({
        price_id: pr.price_id,
        size_name: pr.size_name || "Regular",
        selling_price: Number(pr.selling_price || 0),
      });
    }

    // 4b. Fetch all addons for the retrieved items
    let addonRows: any[] = [];
    try {
      const [addonsResult]: any[] = await pool.query(
        `SELECT addon_id, item_id, addon_name, price, description, is_active
         FROM item_addons
         WHERE item_id IN (?)
         ORDER BY addon_id ASC`,
        [itemIds]
      );
      addonRows = addonsResult;
    } catch (e) {
      console.warn("Could not query item_addons:", e);
    }

    const addonsByItemId = new Map<
      number,
      Array<{
        addon_id: number;
        addon_name: string;
        price: number;
        description?: string;
        is_active: number;
      }>
    >();
    for (const ad of addonRows) {
      if (!addonsByItemId.has(ad.item_id)) {
        addonsByItemId.set(ad.item_id, []);
      }
      addonsByItemId.get(ad.item_id)!.push({
        addon_id: ad.addon_id,
        addon_name: ad.addon_name,
        price: Number(ad.price || 0),
        description: ad.description || "",
        is_active: ad.is_active,
      });
    }

    for (const r of rows) {
      r.addons = addonsByItemId.get(r.item_id) || [];
      const itemPrices = pricesByItemId.get(r.item_id);
      if (itemPrices && itemPrices.length > 0) {
        r.sizes = itemPrices;
        r.item_size = itemPrices.map((s) => s.size_name).join(", ") || r.item_size || "Regular";
        r.selling_price = itemPrices[0].selling_price;
        r.price_raw = itemPrices[0].selling_price;
        if (itemPrices.length === 1) {
          r.price = `LKR ${Number(itemPrices[0].selling_price).toFixed(2)}`;
          r.Price = r.price;
        } else {
          r.price = `From LKR ${Number(itemPrices[0].selling_price).toFixed(2)}`;
          r.Price = r.price;
        }
      } else {
        r.sizes = [
          {
            size_name: r.item_size || "Regular",
            selling_price: Number(r.selling_price || 1500),
          },
        ];
      }
    }
  }

  // 5. Categories list
  const [categories]: any[] = await pool.query(
    "SELECT category_id, category_name FROM item_categories ORDER BY display_order ASC, category_name ASC"
  );

  return {
    items: rows,
    categories,
    totalCount,
    totalPages,
    page,
    pageSize,
  };
}
