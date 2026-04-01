# MyGlamm

A full-stack skincare eCommerce web application that helps users find the right skincare products based on their skin type.

🌐 **Frontend**: [https://myglamm-blush.vercel.app](https://myglamm-blush.vercel.app)
🛠️ **Admin Panel**: [https://myglamm-4ujd.vercel.app](https://myglamm-4ujd.vercel.app)
⚙️ **Backend API**: [https://myglamm.onrender.com](https://myglamm.onrender.com)

---

## Features

- Google OAuth + Email/Password Authentication
- Product browsing by skin type (Oily, Dry, Combination, Sensitive)
- Bestseller section
- Product search with suggestions
- Cart management (add, remove, update quantity)
- Checkout flow — Address → Payment
- Cash on Delivery + Demo Online Payment (card form)
- Order history
- Admin panel — Dashboard, Products, Orders, Contacts

---

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS
- Framer Motion
- React Router v7

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- Google OAuth

**Admin**
- React + Vite
- Recharts (analytics)
- Tailwind CSS

---

## Project Structure

```
Myglamm/
├── src/          → Frontend (React)
├── admin/        → Admin Panel (React)
├── backend/      → Backend API (Node/Express)
```

---

## Local Setup

**Backend**
```bash
cd backend
npm install --legacy-peer-deps
node index.js
```

**Frontend**
```bash
npm install
npm run dev
```

**Admin**
```bash
cd admin
npm install
npm run dev
```

---

## Test Credentials

**Customer**
- Email: `abc@gmail.com`
- Password: `123`

**Admin** — Login via Google with admin account
