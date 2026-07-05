# Faithful Shop ✝️

<div align="center">

<img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit" />

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />

<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

</div>

A modern, faith-inspired e-commerce webshop built with **SvelteKit**, **TypeScript**, **Tailwind CSS**, and **MySQL**. Featuring PayPal integration and a beautiful rose/blue color scheme.

> *"The blessing of the Lord brings wealth, and he adds no trouble with it."* - Proverbs 10:22

---

## ✨ Features

- 🛒 **Shopping Cart** - Add, remove, and update quantities with real-time pricing

- 💳 **PayPal Integration** - Secure payment processing with sandbox/live modes

- 👤 **User Authentication** - Login/Register with bcrypt password hashing

- 📦 **Order Management** - Track orders with PayPal transaction IDs

- 🎨 **Beautiful UI** - Responsive design with Tailwind CSS and custom colors

- 🏗️ **Type-Safe** - Full TypeScript support

- 📱 **Mobile-First** - Responsive design for all devices

---

## 🛠️ Tech Stack

| Category | Technology |

|----------|-----------|

| **Frontend** | SvelteKit 5, Svelte 5 (Runes mode) |

| **Language** | TypeScript |

| **Styling** | Tailwind CSS 3.4, Font Awesome 6 |

| **Database** | MySQL / MariaDB |

| **Authentication** | bcrypt, session cookies |

| **Payments** | PayPal API (Express Checkout) |

| **Deployment** | Vercel |

| **Validation** | Zod |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+

- MySQL/MariaDB 10.11+

- npm or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/webshop-svelte.git

cd webshop-svelte
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

```bash
# Import the database schema

mysql -u root -p < database-schema.sql



# Or connect and run manually

mysql -u root -p -D webshop_db
```

### 4. Configure Environment

```env
# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=webshop_db
DB_PORT=3306

# PayPal (optional during development)
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_SECRET=your_sandbox_secret
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com

# App
ORIGIN=http://localhost:5173
```

### 5. Insert Sample Products

```bash
# Connect to MySQL

mysql -u webshop-svelte -p -h localhost -D webshop_db



# Then run this SQL

INSERT INTO products (product, description, price, stock, category, image_url, active) VALUES

('Faithful Cross Necklace', 'Beautiful sterling silver cross necklace with "Faith" engraved on the back.', 29.99, 50, 'Jewelry', 'https://picsum.photos/seed/cross/400/300', 1),

('Jesus Saves T-Shirt', 'Comfortable 100% cotton t-shirt with "Jesus Saves" printed on the front.', 24.99, 100, 'Clothing', 'https://picsum.photos/seed/tshirt/400/300', 1),

('Bible Study Journal', 'Leather-bound journal with 365 days of Bible study prompts.', 19.99, 75, 'Books', 'https://picsum.photos/seed/journal/400/300', 1);
```

### 6. Run the Development Server

```bash
npm run dev
```

### 📁 Project Structure

```text
webshop-svelte/

├── src/

│ ├── lib/

│ │ ├── components/

│ │ │ ├── FontAwesome.svelte # Icon component

│ │ │ ├── Navigation.svelte # Main navigation

│ │ │ └── ProductCard.svelte # Product card with alternating colors

│ │ ├── server/

│ │ │ ├── auth.ts # Authentication logic

│ │ │ ├── database.ts # Database connection & queries

│ │ │ ├── env.ts # Environment validation

│ │ │ └── paypal.ts # PayPal integration

│ │ └── types/

│ │ └── index.ts # TypeScript type definitions

│ ├── routes/

│ │ ├── +layout.svelte # Main layout

│ │ ├── +page.svelte # Homepage

│ │ ├── auth/

│ │ │ ├── login/

│ │ │ │ └── +page.svelte # Login page

│ │ │ └── register/

│ │ │ └── +page.svelte # Register page

│ │ ├── api/

│ │ │ ├── auth/

│ │ │ │ ├── login/

│ │ │ │ │ └── +server.ts # Login API

│ │ │ │ └── register/

│ │ │ │ └── +server.ts # Register API

│ │ │ ├── cart/

│ │ │ │ └── +server.ts # Cart CRUD API

│ │ │ └── products/

│ │ │ └── +server.ts # Products API

│ │ ├── cart/

│ │ │ └── +page.svelte # Cart page

│ │ └── products/

│ │ └── +page.svelte # Product listing

│ ├── app.css # Global styles

│ ├── app.d.ts # Type definitions

│ └── hooks.server.ts # Server hooks

├── static/

│ └── images/

│ └── products/ # Product images

├── .env.example # Environment template

├── database-schema.sql # Database structure

├── svelte.config.js # SvelteKit config

├── tailwind.config.js # Tailwind CSS config

├── tsconfig.json # TypeScript config

└── package.json # Dependencies
```

### 🗄️ Database Schema

### Products Table

```sql
-- Webshop Database Schema

-- Products table

CREATE TABLE IF NOT EXISTS products (

id INT PRIMARY KEY AUTO_INCREMENT,

product VARCHAR(255) NOT NULL,

description TEXT,

price DECIMAL(10, 2) NOT NULL,

stock INT DEFAULT 0,

category VARCHAR(100),

image_url VARCHAR(255),

active TINYINT DEFAULT 1,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Customers table

CREATE TABLE IF NOT EXISTS customers (

id INT PRIMARY KEY AUTO_INCREMENT,

email VARCHAR(255) NOT NULL UNIQUE,

password VARCHAR(255),

firstname VARCHAR(100),

lastname VARCHAR(100),

phone VARCHAR(20),

address VARCHAR(255),

city VARCHAR(100),

postal_code VARCHAR(20),

country VARCHAR(100),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

INDEX idx_email (email)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Orders table

CREATE TABLE IF NOT EXISTS orders (

id INT PRIMARY KEY AUTO_INCREMENT,

customer_id INT NOT NULL,

total_amount DECIMAL(10, 2) NOT NULL,

status ENUM('pending', 'completed', 'shipped', 'cancelled') DEFAULT 'pending',

payment_method ENUM('paypal', 'ideal', 'other') DEFAULT 'paypal',

paypal_transaction_id VARCHAR(255),

shipping_address VARCHAR(255),

shipping_city VARCHAR(100),

shipping_postal_code VARCHAR(20),

shipping_country VARCHAR(100),

notes TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

INDEX idx_customer_id (customer_id),

INDEX idx_status (status),

INDEX idx_created_at (created_at),

FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Order items table

CREATE TABLE IF NOT EXISTS order_items (

id INT PRIMARY KEY AUTO_INCREMENT,

order_id INT NOT NULL,

product_id INT NOT NULL,

quantity INT NOT NULL,

price DECIMAL(10, 2) NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,

FOREIGN KEY (product_id) REFERENCES products(id),

INDEX idx_order_id (order_id),

INDEX idx_product_id (product_id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Menu table (for navigation)

CREATE TABLE IF NOT EXISTS menu (

id INT PRIMARY KEY AUTO_INCREMENT,

menu_parent INT DEFAULT 0,

href VARCHAR(255),

name VARCHAR(100),

is_dropdown TINYINT DEFAULT 0,

position INT DEFAULT 0,

status TINYINT DEFAULT 1,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

INDEX idx_parent (menu_parent),

INDEX idx_status (status)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Sample products

INSERT INTO products (product, description, price, stock, category, active) VALUES

('Laptop', 'High-performance laptop', 999.99, 5, 'Electronics', 1),

('Wireless Mouse', 'Comfortable wireless mouse', 29.99, 50, 'Accessories', 1),

('USB-C Cable', 'Durable USB-C charging cable', 12.99, 100, 'Cables', 1),

('Monitor Stand', 'Adjustable monitor stand', 49.99, 20, 'Accessories', 1),

('Keyboard', 'Mechanical gaming keyboard', 129.99, 15, 'Accessories', 1);
```

🤝 Contributing

1. Fork the repository

2. Create a feature branch (git checkout -b feature/amazing-feature)

3. Commit your changes (git commit -m 'Add amazing feature')

4. Push to the branch (git push origin feature/amazing-feature)

5. Open a Pull Request



### 🙏 Acknowledgments

* Built with ❤️ and faith in Jesus Christ

* Inspired by zkitzo.one

* All glory to God, Hallelujah!



### 📞 Support

* Issues: GitHub Issues

* Email: alexmester@gmail.com

* Phone: +31644414689

> "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life." - John 3:16

**All Glory to Jesus Christ, HALLELUJAH AND AMEN! 🙌**



## 🙏 Final Word

> *"The Lord will keep you from all harm—he will watch over your life."* - Psalm 121:7

**All Glory to Jesus Christ, HALLELUJAH AND AMEN!**
