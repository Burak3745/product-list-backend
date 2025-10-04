Product Listing API
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

This is the backend service for the Product Listing Application.
It provides product data via a RESTful API, dynamically calculates product prices based on real-time gold prices, and supports filtering by price range and popularity.

🚀 Features
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Mock Products API: Products are served from a static JSON file.

Dynamic Price Calculation: Price = (popularityScore + 1) * weight * goldPrice

  * weight = product weight (grams)

  * popularityScore = product popularity (0–1)

  * goldPrice = real-time gold price per gram (fetched from GoldAPI.io)

Gold Price Caching: Gold price is cached for 10 minutes to reduce API calls.

Filtering Support:

Price range (minPrice, maxPrice)

Popularity range (minPopularity, maxPopularity)

🛠️ Tech Stack
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Node.js

Express.js

Axios (for external API requests)

Dotenv (for environment variables)

Cors

📦 Installation
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

1. Clone the repository:

    * git clone https://github.com/Burak3745/product-list-backend.git
    * cd product-list-backend


2. Install dependencies:

    * npm install


3. Create a .env file in the project root:

    * GOLD_API_KEY=your_api_key_here


4. Run the development server:

    * npm run dev

📡 API Endpoints
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. Get Products
GET /products


2. Query Parameters (optional):

    * minPrice – Minimum price (USD)

    * maxPrice – Maximum price (USD)

    * minPopularity – Minimum popularity score (0–1)

    * maxPopularity – Maximum popularity score (0–1)

3. Example:

    * /products?minPrice=500&maxPrice=1500&minPopularity=0.5

Get Gold Price
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
GET /gold-price

Returns the current gold price per gram in USD (cached for 10 minutes).

🔧 Environment Variables
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

GOLD_API_KEY → API key from GoldAPI.io

🚀 Future Improvements
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Database integration (MongoDB / PostgreSQL)

Product management (CRUD)

User authentication & authorization

Sorting options (price ascending/descending, popularity, etc.)
