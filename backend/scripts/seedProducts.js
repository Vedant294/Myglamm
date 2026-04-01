import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Products.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

await mongoose.connect(process.env.MONGO_URI);

// Upload image from URL to Cloudinary
const uploadFromUrl = async (url) => {
  const result = await cloudinary.uploader.upload(url, { folder: "myglamm" });
  return result.secure_url;
};

const products = [
  {
    name: "Niacinamide Oil Control Serum",
    description: "Controls excess oil and minimizes pores for a matte finish.",
    category: "Oily",
    price: 599,
    weight: "30ml",
    rating: 4.5,
    bestseller: true,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
  },
  {
    name: "Salicylic Acid Face Wash",
    description: "Deep cleanses pores and reduces acne breakouts.",
    category: "Oily",
    price: 349,
    weight: "100ml",
    rating: 4.3,
    bestseller: false,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
  },
  {
    name: "Hyaluronic Acid Moisturizer",
    description: "Intense hydration that locks moisture for 24 hours.",
    category: "Dry",
    price: 799,
    weight: "50ml",
    rating: 4.7,
    bestseller: true,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
  },
  {
    name: "Shea Butter Night Cream",
    description: "Rich overnight cream that repairs and nourishes dry skin.",
    category: "Dry",
    price: 649,
    weight: "50g",
    rating: 4.4,
    bestseller: false,
    imageUrl: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400",
  },
  {
    name: "Balancing Toner",
    description: "Balances oily T-zone while hydrating dry areas.",
    category: "Combination",
    price: 449,
    weight: "150ml",
    rating: 4.2,
    bestseller: false,
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400",
  },
  {
    name: "Dual Action Gel Cream",
    description: "Lightweight gel-cream that controls shine and hydrates.",
    category: "Combination",
    price: 699,
    weight: "50ml",
    rating: 4.5,
    bestseller: true,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
  },
  {
    name: "Aloe Vera Soothing Gel",
    description: "Calms redness and irritation for sensitive skin types.",
    category: "Sensitive",
    price: 399,
    weight: "100ml",
    rating: 4.6,
    bestseller: true,
    imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400",
  },
  {
    name: "Fragrance-Free Gentle Cleanser",
    description: "Mild, soap-free cleanser that won't irritate sensitive skin.",
    category: "Sensitive",
    price: 299,
    weight: "150ml",
    rating: 4.3,
    bestseller: false,
    imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
  },
];

console.log("🌱 Seeding products...");

for (const p of products) {
  try {
    const exists = await Product.findOne({ name: p.name });
    if (exists) {
      console.log(`⏭️  Skipping "${p.name}" — already exists`);
      continue;
    }
    console.log(`📤 Uploading image for "${p.name}"...`);
    const imageUrl = await uploadFromUrl(p.imageUrl);
    const { imageUrl: _, ...productData } = p;
    await Product.create({ ...productData, image: imageUrl, stock: 50 });
    console.log(`✅ Added "${p.name}"`);
  } catch (err) {
    console.error(`❌ Failed "${p.name}":`, err.message);
  }
}

await mongoose.disconnect();
console.log("✅ Done seeding!");
