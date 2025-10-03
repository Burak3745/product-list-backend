import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

export async function getGoldPrice() {

  const cachedPrice = cache.get("goldPrice");
  if (cachedPrice) {
    return cachedPrice;
  }

  try {
    const resp = await axios.get(process.env.GOLD_API_URL, {
      headers: {
        "x-access-token": process.env.GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (resp.data && resp.data.price_gram_24k) {
      const goldPrice = parseFloat(resp.data.price_gram_24k);

      cache.set("goldPrice", goldPrice);

      return goldPrice;
    }

    console.warn("Gold API did not return price_gram_24k, using fallback");
    return parseFloat(process.env.FALLBACK_GOLD_PRICE) || 65.0;
  } catch (err) {
    console.error("Error fetching gold price:", err.message);
    return parseFloat(process.env.FALLBACK_GOLD_PRICE) || 65.0;
  }
}
