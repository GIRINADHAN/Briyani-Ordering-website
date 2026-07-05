# 👑 Bhai Biryani – Royal Indian Delicacies & Table Booking Portal

A visual, highly interactive, full-featured web application designed for **Bhai Biryani**, serving authentic Indian Dum Biryani, Kebabs, and more. This platform merges traditional culinary heritage with an ultra-modern, responsive digital dining experience.

Explore the live app to customize your plate in the **Chef's Lab**, book tables, register with dynamic **OTP verification**, and checkout with an automated **Courier-style Invoice Generator**!

---

## ✨ Features Breakdown

### 1. 🧪 Chef's Lab: Interactive Customizer
*   **Create Your Plate:** Choose from distinct base rices (Basmati, Jeeraga Samba) and premium proteins (Royal Mutton, Juicy Chicken, Paneer Tikka, Fresh Veggies).
*   **Spice Intensity Controls:** Adjust heat parameters with visual dynamic badges (Mild, Medium, Hyderabad Fire 🔥).
*   **Extras & Toppings:** Include Fried Onions, Roasted Cashews, Boiled Egg, or Creamy Raita.
*   **Live Preview & Cost Calculator:** Watch the plate visualization and receipt totals update dynamically in real-time.
*   **💼 Special HR Welcome Mode:** Enter your name to generate a custom **Honorary Chef Certificate** on the spot—perfect for tech recruiters and hiring managers!

### 2. 🛒 Royal Shopping Cart Engine
*   **Unified State:** Add both standard menu items and highly specific Chef's Lab custom plates.
*   **Dynamic Calculations:** Auto-calculates standard pricing, 18% GST/Taxes, and free delivery thresholds (free above $15, with status warnings).
*   **Quantity Controls:** Adjust portion sizes directly inside the cart or discard items on-the-fly with toast notification updates.

### 3. 💳 Secure Payment Gateway
*   **Flexible Framework:** Toggle instantly between UPI Payments (GooglePay, PhonePe, Paytm), Credit/Debit cards, or Cash on Delivery (COD).
*   **Validation Check:** Form fields change dynamically based on the chosen payment mechanism, complete with custom user validation.

### 4. 🧾 Courier-Style Invoice Receipt Generator
*   **Receipt Layout:** A vintage Courier-font cash receipt mimicking actual POS machines.
*   **Verified Purchase Stamp:** Featuring a custom, rotated green `PAID SUCCESS` double-line stamp.
*   **Unique Invoice Numbers:** Auto-generates unique sequential codes (`BBK-XXXXXX`), timestamps, and fully compiled order details.

### 5. 🪑 Interactive Table & Seat Reservation
*   **Seat Selector:** View the interactive restaurant floor plan and select individual seats dynamically.
*   **Dynamic Table Billing:** Real-time billing summary based on seat count (₹100 per chair) and instant navigation to checkout.

### 6. 🔐 Dynamic Registration & Verification
*   **Client Validation:** Rich field checks with responsive red error banners.
*   **Secure OTP Simulation:** Generates a 6-digit verifier displayed on a visual verification banner (eliminates blocking popups) for flawless preview testing.

---

## 🛠️ Tech Stack & Architecture

*   **Build Tool & Bundler:** [Vite](https://vite.dev/) (Vite v6 for lightning-fast bundling & asset pipeline)
*   **Frontend Technologies:** Pure HTML5, CSS3, and modern ECMAScript (ES6+)
*   **Styling System:** CSS Custom Variables, responsive Flexbox/Grid layouts, and modular CSS modules (e.g., `cart.css`, `bill.css`, `index.css`)
*   **Typography & Vector Graphics:** Google Material Icons, FontAwesome icons, and styled monospace design components

---

## 🚀 Getting Started

Follow these steps to run the project locally on your system:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your computer.

### 2. Installation
Clone your repository or download the source code, open your terminal inside the root folder, and run:
```bash
npm install
```

### 3. Run Development Server
Spin up the local server with Vite:
```bash
npm run dev
```
By default, the server will launch on `http://localhost:3000` or the first available port.

### 4. Build for Production
To bundle and optimize the application for GitHub Pages, Cloud Run, or any static provider, run:
```bash
npm run build
```
This compiles assets and places them into the optimized `/dist` folder.

---

## 📂 Project Structure

```text
├── index1/                  # Main Source Directory
│   ├── imgs/                # Custom assets, culinary illustrations, and icons
│   ├── page2 imgs/          # Dedicated menu items assets
│   ├── index.html           # Main SPA entrypoint
│   ├── index.js             # Core Application controller & dynamic routers
│   ├── navbar.js            # Standardized global navigation
│   ├── index.css            # Base layouts & landing styles
│   ├── cart.css             # Shopping Cart layout
│   ├── bill.css             # Courier invoice styles
│   ├── login.css            # Dynamic auth screens styles
│   ├── otp.css              # Custom verification grids
│   └── page2.css            # Royal menu screens styles
├── src/                     # Source extensions
├── package.json             # Build commands and metadata configurations
├── vite.config.ts           # Vite server definitions
└── README.md                # This documentation
```

---

## 🌟 Crafted with Elegance

The user interface uses a **Royal Warm palette**:
*   `#880203` (Royal Maroon Red) - Portraying authentic Indian heritage.
*   `#FFA608` (Saffron Gold) - Symbolizing rich spices and gourmet excellence.
*   `#FFFFFF` & `#F5F5F5` (Cream/White Canvas) - Clean, contrast-optimized layout for premium look and feel.
