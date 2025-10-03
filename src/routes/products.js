import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getGoldPrice } from "../services/goldPrice.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, "../../data/products.json");

router.get("/", async (req, res) => {
  try {
    const rawData = fs.readFileSync(productsPath);
    const products = JSON.parse(rawData);

    const goldPrice = await getGoldPrice();

    let transformed = products.map((p, idx) => {
      const price = (p.popularityScore + 1) * p.weight * goldPrice;
      const rating = Number((p.popularityScore * 5).toFixed(1));

      return {
        id: idx + 1,
        name: p.name,
        popularityScore: p.popularityScore,
        ratingOutOf5: rating,
        weight: p.weight,
        priceUSD: Number(price.toFixed(2)),
        images: p.images,
      };
    });

    const { minPrice, maxPrice, minPopularity, maxPopularity, color } = req.query;

    if (minPrice) {
      transformed = transformed.filter((p) => p.priceUSD >= parseFloat(minPrice));
    }
    if (maxPrice) {
      transformed = transformed.filter((p) => p.priceUSD <= parseFloat(maxPrice));
    }
    if (minPopularity) {
      transformed = transformed.filter((p) => p.popularityScore >= parseFloat(minPopularity));
    }
    if (maxPopularity) {
      transformed = transformed.filter((p) => p.popularityScore <= parseFloat(maxPopularity));
    }
    if (color) {
      transformed = transformed.filter((p) => p.images[color.toLowerCase()]);
    }

    res.json(transformed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
