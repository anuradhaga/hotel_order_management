-- Grand Dilara Hotel Order Management System (GDH-OMS)
-- Database Initialization & DDL Schema
-- Venue: Grand Dilara Hotel & Suites
-- Compliant with SRS v1.0 Specification

CREATE DATABASE IF NOT EXISTS `dsschool_hom` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dsschool_hom`;

-- 1. Table: outlets
CREATE TABLE IF NOT EXISTS `outlets` (
  `outlet_id` INT AUTO_INCREMENT PRIMARY KEY,
  `outlet_code` VARCHAR(20) NOT NULL UNIQUE,
  `outlet_name` VARCHAR(100) NOT NULL,
  `outlet_type` VARCHAR(30) NOT NULL COMMENT 'DINE_IN, COUNTER, EVENT_BAR',
  `tax_rate` DECIMAL(5,2) DEFAULT 15.00 COMMENT 'Applicable VAT %',
  `sc_rate` DECIMAL(5,2) DEFAULT 10.00 COMMENT 'Applicable Service Charge %',
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table: events
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` INT AUTO_INCREMENT PRIMARY KEY,
  `event_code` VARCHAR(20) NOT NULL UNIQUE,
  `event_name` VARCHAR(100) NOT NULL,
  `start_datetime` DATETIME NOT NULL,
  `end_datetime` DATETIME NOT NULL,
  `location_name` VARCHAR(100) NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table: users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `role_code` VARCHAR(30) NOT NULL COMMENT 'ADMIN, CASHIER, WAITER, CHEF, EXPEDITER, MANAGER',
  `outlet_id` INT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`outlet_id`) REFERENCES `outlets`(`outlet_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table: restaurant_tables
CREATE TABLE IF NOT EXISTS `restaurant_tables` (
  `table_id` INT AUTO_INCREMENT PRIMARY KEY,
  `table_number` VARCHAR(20) NOT NULL UNIQUE,
  `seating_capacity` INT NOT NULL DEFAULT 4,
  `dining_zone` VARCHAR(50) NOT NULL DEFAULT 'Indoor AC',
  `current_status` VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' COMMENT 'AVAILABLE, SEATED, BILL_REQUESTED, CLEANING',
  `active_order_id` INT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Table: item_categories
CREATE TABLE IF NOT EXISTS `item_categories` (
  `category_id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(100) NOT NULL,
  `category_code` VARCHAR(20) NOT NULL UNIQUE,
  `display_order` INT DEFAULT 0,
  `icon_class` VARCHAR(50) DEFAULT 'ti ti-category',
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Table: items
CREATE TABLE IF NOT EXISTS `items` (
  `item_id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `item_code` VARCHAR(20) NOT NULL UNIQUE,
  `item_name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `kitchen_dept` VARCHAR(50) NOT NULL DEFAULT 'MAIN_KITCHEN' COMMENT 'MAIN_KITCHEN, GRILL, PASTRY, BAR',
  `is_spicy` BOOLEAN DEFAULT FALSE,
  `is_vegetarian` BOOLEAN DEFAULT FALSE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `item_categories`(`category_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Table: item_prices
CREATE TABLE IF NOT EXISTS `item_prices` (
  `price_id` INT AUTO_INCREMENT PRIMARY KEY,
  `item_id` INT NOT NULL,
  `selling_price` DECIMAL(10,2) NOT NULL,
  `effective_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` DATETIME NULL,
  `is_current` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`item_id`) REFERENCES `items`(`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Table: orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(30) NOT NULL UNIQUE,
  `operating_mode` VARCHAR(20) NOT NULL COMMENT 'OUTLET_COUNTER or DINE_IN',
  `outlet_id` INT NOT NULL,
  `event_id` INT NULL,
  `table_id` INT NULL,
  `customer_mobile` VARCHAR(20) NULL,
  `tracking_token` VARCHAR(64) NOT NULL UNIQUE,
  `pickup_token` VARCHAR(10) NULL COMMENT '4-digit pickup code, e.g., #7492',
  `order_status` VARCHAR(30) NOT NULL DEFAULT 'DRAFT' COMMENT 'DRAFT, OTP_PENDING, CONFIRMED, QUEUED, PREPARING, PREPARED, READY, COLLECTED, COMPLETED, CANCELLED',
  `subtotal_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `sc_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '10% Service Charge',
  `vat_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '15% VAT',
  `net_payable` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `guest_count` INT DEFAULT 1,
  `waiter_user_id` INT NULL,
  `cashier_user_id` INT NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`outlet_id`) REFERENCES `outlets`(`outlet_id`),
  FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE SET NULL,
  FOREIGN KEY (`table_id`) REFERENCES `restaurant_tables`(`table_id`) ON DELETE SET NULL,
  FOREIGN KEY (`waiter_user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`cashier_user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add active_order_id foreign key constraint now that orders table is defined
ALTER TABLE `restaurant_tables`
  ADD CONSTRAINT `fk_tables_active_order`
  FOREIGN KEY (`active_order_id`) REFERENCES `orders`(`order_id`) ON DELETE SET NULL;

-- 9. Table: order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `round_number` INT NOT NULL DEFAULT 1 COMMENT '1, 2, 3 in Mode B Dine-In',
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `line_total` DECIMAL(10,2) NOT NULL,
  `cooking_notes` VARCHAR(255) NULL,
  `item_status` VARCHAR(20) NOT NULL DEFAULT 'QUEUED' COMMENT 'QUEUED, PREPARING, PREPARED, SERVED',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `items`(`item_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Table: payments
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `payment_method` VARCHAR(30) NOT NULL COMMENT 'CASH, CREDIT_CARD, DEBIT_CARD, ROOM_CHARGE',
  `payable_amount` DECIMAL(10,2) NOT NULL,
  `tendered_amount` DECIMAL(10,2) NOT NULL,
  `change_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `card_auth_code` VARCHAR(50) NULL,
  `room_number` VARCHAR(20) NULL,
  `guest_name` VARCHAR(100) NULL,
  `cashier_user_id` INT NULL,
  `payment_status` VARCHAR(20) NOT NULL DEFAULT 'SETTLED' COMMENT 'SETTLED, REFUNDED, VOIDED',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`cashier_user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Table: otp_transactions
CREATE TABLE IF NOT EXISTS `otp_transactions` (
  `otp_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `mobile_number` VARCHAR(20) NOT NULL,
  `otp_code_plain` VARCHAR(10) NULL COMMENT 'Simulated plain OTP for test display',
  `otp_code_hash` VARCHAR(255) NOT NULL,
  `expiry_time` DATETIME NOT NULL,
  `attempt_count` INT NOT NULL DEFAULT 0,
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `verified_at` DATETIME NULL,
  `sms_status` VARCHAR(30) NOT NULL DEFAULT 'SENT',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Table: shift_records
CREATE TABLE IF NOT EXISTS `shift_records` (
  `shift_id` INT AUTO_INCREMENT PRIMARY KEY,
  `cashier_user_id` INT NOT NULL,
  `outlet_id` INT NOT NULL,
  `opened_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closed_at` DATETIME NULL,
  `opening_float` DECIMAL(10,2) NOT NULL DEFAULT 10000.00,
  `cash_sales` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `card_sales` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `room_charges` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_discounts` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_sc` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_vat` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `cash_counted` DECIMAL(10,2) NULL,
  `variance_amount` DECIMAL(10,2) NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'OPEN' COMMENT 'OPEN, CLOSED',
  FOREIGN KEY (`cashier_user_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`outlet_id`) REFERENCES `outlets`(`outlet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- SEED DATA: Grand Dilara Hotel & Suites
-- -------------------------------------------------------------

-- Outlets
INSERT INTO `outlets` (`outlet_id`, `outlet_code`, `outlet_name`, `outlet_type`, `tax_rate`, `sc_rate`, `is_active`) VALUES
(1, 'REST-MAIN', 'Dilara Fine Dining Restaurant', 'DINE_IN', 15.00, 10.00, 1),
(2, 'POOL-CAFE', 'Grand Azure Poolside Cafe', 'COUNTER', 15.00, 10.00, 1),
(3, 'LOUNGE-BAR', 'Skyline Sapphire Lounge & Bar', 'COUNTER', 15.00, 10.00, 1),
(4, 'BANQ-HALL-A', 'Grand Ballroom & Banquet Counter', 'EVENT_BAR', 15.00, 10.00, 1)
ON DUPLICATE KEY UPDATE `outlet_name`=VALUES(`outlet_name`);

-- Events
INSERT INTO `events` (`event_id`, `event_code`, `event_name`, `start_datetime`, `end_datetime`, `location_name`, `is_active`) VALUES
(1, 'EVT-GALA-2026', 'Grand Dilara Executive Gala Dinner', '2026-09-20 18:00:00', '2026-09-20 23:59:00', 'Grand Ballroom A', 1),
(2, 'EVT-POOL-SUNSET', 'Sunset Jazz & Cocktails Night', '2026-09-21 17:00:00', '2026-09-21 22:30:00', 'Poolside Terrace', 1)
ON DUPLICATE KEY UPDATE `event_name`=VALUES(`event_name`);

-- Users
INSERT INTO `users` (`user_id`, `username`, `password_hash`, `full_name`, `role_code`, `outlet_id`, `is_active`) VALUES
(1, 'admin', '$2b$12$cN1qwkr3iTMk8kdx9f2TYexgaTnZ3trzZ3HBCSqUESuPLZydgjFw2', 'Chathura Kumarasighe', 'ADMIN', 1, 1),
(2, 'cashier1', '$2b$12$AWFlv5kBXWsxX3T1R4/HROQSAU5EEjkldG7CAKGDDiPCEJLS72spu', 'Nimal Perera', 'CASHIER', 2, 1),
(3, 'waiter1', '$2b$12$TELByTYpSGv/MRscWfFg6ueRbvTWaM7SFWGqNlECgW36tdyam7KlG', 'Sunil Fernando', 'WAITER', 1, 1),
(4, 'chef1', '$2b$12$SRbAolc2FXhuZRj.uYv1eOJEg.pFuGLcVb.iC6r3Gj6YNNGF4IFV2', 'Executive Chef Bandara', 'CHEF', 1, 1),
(5, 'expediter1', '$2b$12$BmDEm4OwSFvxo7zzYE6Tm.29mjYWYlRB8AxkXL5pY0m3qBGkXCt3O', 'Kasun Jayawardena', 'EXPEDITER', 2, 1),
(6, 'manager1', '$2b$12$F6/tl.W86pX6dVp5zogeqOmDgo0L0QFdyDBrgsF/Dhptp2rjQn90m', 'F&B Director Senanayake', 'MANAGER', 1, 1)
ON DUPLICATE KEY UPDATE `full_name`=VALUES(`full_name`);

-- Restaurant Tables
INSERT INTO `restaurant_tables` (`table_id`, `table_number`, `seating_capacity`, `dining_zone`, `current_status`) VALUES
(1, 'T-01', 2, 'Indoor AC', 'AVAILABLE'),
(2, 'T-02', 2, 'Indoor AC', 'AVAILABLE'),
(3, 'T-03', 4, 'Indoor AC', 'AVAILABLE'),
(4, 'T-04', 4, 'Indoor AC', 'AVAILABLE'),
(5, 'T-05', 6, 'Indoor AC', 'AVAILABLE'),
(6, 'T-06', 4, 'Terrace', 'AVAILABLE'),
(7, 'T-07', 4, 'Terrace', 'AVAILABLE'),
(8, 'T-08', 6, 'Terrace', 'AVAILABLE'),
(9, 'T-09', 4, 'Balcony', 'AVAILABLE'),
(10, 'T-10', 8, 'VIP Dining', 'AVAILABLE'),
(11, 'T-11', 8, 'VIP Dining', 'AVAILABLE'),
(12, 'T-12', 10, 'VIP Dining', 'AVAILABLE')
ON DUPLICATE KEY UPDATE `table_number`=VALUES(`table_number`);

-- Item Categories
INSERT INTO `item_categories` (`category_id`, `category_name`, `category_code`, `display_order`, `icon_class`, `is_active`) VALUES
(1, 'Starters & Appetizers', 'APP', 1, 'ti ti-tools-kitchen-2', 1),
(2, 'Signature Mains & Grills', 'MAIN', 2, 'ti ti-meat', 1),
(3, 'Artisan Pizza & Pasta', 'PIZZA', 3, 'ti ti-pizza', 1),
(4, 'Fine Desserts & Sweets', 'DESSERT', 4, 'ti ti-cake', 1),
(5, 'Beverages & Fresh Juices', 'BEV', 5, 'ti ti-cup', 1),
(6, 'Cocktails & Spirits', 'BAR', 6, 'ti ti-glass-cocktail', 1)
ON DUPLICATE KEY UPDATE `category_name`=VALUES(`category_name`);

-- Menu Items
INSERT INTO `items` (`item_id`, `category_id`, `item_code`, `item_name`, `description`, `kitchen_dept`, `is_spicy`, `is_vegetarian`, `is_active`) VALUES
(1, 1, 'APP-01', 'Crispy Calamari Rings with Tartar', 'Fresh local calamari rings dipped in seasoned batter, served with house lemon tartar.', 'MAIN_KITCHEN', 0, 0, 1),
(2, 1, 'APP-02', 'Spicy Devilled Chicken Wings', 'Tender drumettes tossed in Sri Lankan crushed pepper and sweet chili glaze.', 'MAIN_KITCHEN', 1, 0, 1),
(3, 1, 'APP-03', 'Mediterranean Bruschetta Trio', 'Toasted sourdough topped with basil tomato concasse, garlic confit, and balsamic glaze.', 'MAIN_KITCHEN', 0, 1, 1),

(4, 2, 'GRILL-01', 'Australian Black Angus Ribeye (300g)', 'Prime chargrilled ribeye steak served with truffle mashed potato and green peppercorn jus.', 'GRILL', 0, 0, 1),
(5, 2, 'GRILL-02', 'Grand Dilara Mixed Seafood Platter', 'Jumbo prawns, sear fish fillet, calamari, and blue swimmer crab with garlic herb butter.', 'GRILL', 0, 0, 1),
(6, 2, 'MAIN-01', 'Sri Lankan Ceylon Spiced Mutton Curry', 'Slow-cooked mutton with roasted Jaffna spices, served with fragrant basmati rice and accompaniments.', 'MAIN_KITCHEN', 1, 0, 1),
(7, 2, 'MAIN-02', 'Wild Mushroom & Truffle Risotto', 'Arborio rice cooked in rich vegetable broth with porcini mushrooms and aged parmesan.', 'MAIN_KITCHEN', 0, 1, 1),

(8, 3, 'PIZ-01', 'Wood-Fired Dilara Supreme Pizza', 'Smoked bacon, spicy chorizo, mozzarella, bell peppers, and sun-dried tomatoes.', 'MAIN_KITCHEN', 0, 0, 1),
(9, 3, 'PIZ-02', 'Classic Buffalo Margherita', 'Italian San Marzano tomato base, fresh buffalo mozzarella, virgin olive oil, and sweet basil.', 'MAIN_KITCHEN', 0, 1, 1),
(10, 3, 'PAS-01', 'Fettuccine Creamy Tiger Prawn Alfredo', 'Fresh fettuccine tossed in rich garlic cream parmesan sauce with grilled tiger prawns.', 'MAIN_KITCHEN', 0, 0, 1),

(11, 4, 'DES-01', 'Warm Belgian Dark Chocolate Lava', 'Molten dark chocolate cake served with Madagascan vanilla bean ice cream.', 'PASTRY', 0, 1, 1),
(12, 4, 'DES-02', 'Passion Fruit Panna Cotta', 'Velvety cooked cream infused with organic passion fruit coulis and mint tuile.', 'PASTRY', 0, 1, 1),

(13, 5, 'BEV-01', 'Fresh King Coconut Refresher', 'Chilled pure King Coconut water infused with fresh mint leaves and lime squeeze.', 'BAR', 0, 1, 1),
(14, 5, 'BEV-02', 'Tropical Mango & Passion Smoothie', 'Freshly pureed local honey mango and tangy passion fruit with Greek yogurt.', 'BAR', 0, 1, 1),
(15, 6, 'CKT-01', 'Ceylon Arrack Sour Signature', 'Old Reserve Arrack, fresh lemon juice, sugar syrup, and aromatic bitters.', 'BAR', 0, 1, 1),
(16, 6, 'CKT-02', 'Classic Mojito Tropical Splash', 'White rum, fresh garden mint, lime wedges, cane sugar, and club soda.', 'BAR', 0, 1, 1)
ON DUPLICATE KEY UPDATE `item_name`=VALUES(`item_name`);

-- Versioned Item Prices (LKR)
INSERT INTO `item_prices` (`item_id`, `selling_price`, `effective_date`, `is_current`) VALUES
(1, 1850.00, NOW(), 1),
(2, 1650.00, NOW(), 1),
(3, 1250.00, NOW(), 1),
(4, 7800.00, NOW(), 1),
(5, 6900.00, NOW(), 1),
(6, 3400.00, NOW(), 1),
(7, 2800.00, NOW(), 1),
(8, 3600.00, NOW(), 1),
(9, 2900.00, NOW(), 1),
(10, 3800.00, NOW(), 1),
(11, 1750.00, NOW(), 1),
(12, 1550.00, NOW(), 1),
(13, 650.00, NOW(), 1),
(14, 950.00, NOW(), 1),
(15, 1850.00, NOW(), 1),
(16, 1750.00, NOW(), 1)
ON DUPLICATE KEY UPDATE `selling_price`=VALUES(`selling_price`);
