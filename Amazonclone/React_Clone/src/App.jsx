import React, { useMemo, useState } from "react";
import "./App.css";

function createFallbackImage(productName, section) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="25" y="25" width="350" height="250" rx="18" fill="#ffffff" stroke="#d1d5db"/>
      <text x="50%" y="42%" text-anchor="middle" font-family="Arial" font-size="26" font-weight="700" fill="#111827">
        ${section}
      </text>
      <text x="50%" y="58%" text-anchor="middle" font-family="Arial" font-size="18" fill="#4b5563">
        ${productName}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const products = [
  {
    id: 1,
    section: "Phones",
    name: "Apple iPhone 15",
    brand: "Apple",
    tag: "Best Seller",
    price: 69999,
    mrp: 79999,
    rating: 4.6,
    reviews: 18432,
    delivery: "FREE delivery by tomorrow",
    offer: "10% instant discount on bank cards",
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UY218_.jpg",
    options: ["128 GB", "Black", "5G"],
  },
  {
    id: 2,
    section: "Phones",
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    tag: "Amazon Choice",
    price: 57999,
    mrp: 74999,
    rating: 4.4,
    reviews: 11320,
    delivery: "FREE delivery in 2 days",
    offer: "Exchange offer available",
    image: "https://m.media-amazon.com/images/I/71CXhVhpM0L._AC_UY218_.jpg",
    options: ["8 GB RAM", "256 GB", "Violet"],
  },
  {
    id: 3,
    section: "Laptops",
    name: "HP Pavilion Laptop",
    brand: "HP",
    tag: "Great Value",
    price: 58990,
    mrp: 69990,
    rating: 4.3,
    reviews: 8921,
    delivery: "FREE delivery this week",
    offer: "No-cost EMI available",
    image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_UY218_.jpg",
    options: ["16 GB RAM", "512 GB SSD", "Intel i5"],
  },
  {
    id: 4,
    section: "Laptops",
    name: "Apple MacBook Air M2",
    brand: "Apple",
    tag: "Premium",
    price: 89990,
    mrp: 99900,
    rating: 4.8,
    reviews: 15402,
    delivery: "FREE delivery by tomorrow",
    offer: "Student discount available",
    image: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg",
    options: ["8 GB RAM", "256 GB SSD", "Silver"],
  },
  {
    id: 5,
    section: "Shoes",
    name: "Nike Running Shoes",
    brand: "Nike",
    tag: "Deal of the Day",
    price: 3499,
    mrp: 5999,
    rating: 4.2,
    reviews: 7201,
    delivery: "FREE delivery on first order",
    offer: "Extra 5% off with coupon",
    image: "https://m.media-amazon.com/images/I/71oEKkghg-L._AC_UY218_.jpg",
    options: ["Size 7", "Size 8", "Size 9"],
  },
  {
    id: 6,
    section: "Shoes",
    name: "Adidas Sports Sneakers",
    brand: "Adidas",
    tag: "Top Rated",
    price: 4299,
    mrp: 6999,
    rating: 4.5,
    reviews: 6420,
    delivery: "FREE delivery by Saturday",
    offer: "Limited time deal",
    image: "https://m.media-amazon.com/images/I/71bXz3s3G-L._AC_UY218_.jpg",
    options: ["Size 6", "Size 8", "White"],
  },
  {
    id: 7,
    section: "Watches",
    name: "Noise Smart Watch",
    brand: "Noise",
    tag: "New Arrival",
    price: 2499,
    mrp: 5999,
    rating: 4.1,
    reviews: 4832,
    delivery: "FREE delivery by Friday",
    offer: "Bluetooth calling included",
    image: "https://m.media-amazon.com/images/I/61TapeOXotL._AC_UY218_.jpg",
    options: ["AMOLED", "Black", "Waterproof"],
  },
  {
    id: 8,
    section: "Headphones",
    name: "boAt Wireless Headphones",
    brand: "boAt",
    tag: "Popular",
    price: 1799,
    mrp: 3999,
    rating: 4.0,
    reviews: 23122,
    delivery: "FREE delivery tomorrow",
    offer: "Up to 55% off",
    image: "https://m.media-amazon.com/images/I/61kWB+uzR2L._AC_UY218_.jpg",
    options: ["Bluetooth", "40 hrs battery", "Black"],
  },
  {
    id: 9,
    section: "Bags",
    name: "American Tourister Backpack",
    brand: "American Tourister",
    tag: "School Deal",
    price: 1299,
    mrp: 2499,
    rating: 4.3,
    reviews: 11230,
    delivery: "FREE delivery in 2 days",
    offer: "Laptop compartment included",
    image: "https://m.media-amazon.com/images/I/91zY2V0U16L._AC_UY218_.jpg",
    options: ["32 L", "Blue", "Water resistant"],
  },
  {
    id: 10,
    section: "Kitchen",
    name: "Prestige Mixer Grinder",
    brand: "Prestige",
    tag: "Kitchen Deal",
    price: 2999,
    mrp: 4999,
    rating: 4.2,
    reviews: 7541,
    delivery: "FREE delivery this week",
    offer: "3 jars included",
    image: "https://m.media-amazon.com/images/I/61CqYq+xwNL._AC_UY218_.jpg",
    options: ["750W", "3 Jars", "White"],
  },
  {
    id: 11,
    section: "Fashion",
    name: "Men Cotton T-Shirt",
    brand: "Amazon Brand",
    tag: "Fashion Sale",
    price: 499,
    mrp: 999,
    rating: 4.0,
    reviews: 6200,
    delivery: "FREE delivery by Monday",
    offer: "Buy 2 get 10% off",
    image: "https://m.media-amazon.com/images/I/61-6l2NzSUL._AC_UY218_.jpg",
    options: ["M", "L", "XL"],
  },
  {
    id: 12,
    section: "Beauty",
    name: "Lakme Makeup Kit",
    brand: "Lakme",
    tag: "Beauty Pick",
    price: 999,
    mrp: 1799,
    rating: 4.4,
    reviews: 3904,
    delivery: "FREE delivery tomorrow",
    offer: "Combo pack offer",
    image: "https://m.media-amazon.com/images/I/61wXkL1Vf-L._AC_UY218_.jpg",
    options: ["Combo", "Daily use", "Gift pack"],
  },
];

const categories = ["All", ...new Set(products.map((product) => product.section))];

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const searchText = `${product.name} ${product.brand} ${product.section}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.section === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  function handleImageError(event, product) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = createFallbackImage(product.name, product.section);
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="page">
      <header className="topbar">
        <a href="#home" className="logo">
          amazon<span>.in</span>
        </a>

        <div className="location">
          <span>Delivering to India</span>
          <b>Update location</b>
        </div>

        <div className="searchBox">
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search all products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="button">Search</button>
        </div>

        <div className="account">
          <span>Hello, sign in</span>
          <b>Account & Lists</b>
        </div>

        <div className="orders">
          <span>Returns</span>
          <b>& Orders</b>
        </div>

        <a href="#cart" className="cart">
          Cart <b>{cartCount}</b>
        </a>
      </header>

      <nav className="nav">
        <a href="#home">All</a>
        <a href="#products">Today's Deals</a>
        <a href="#products">Mobiles</a>
        <a href="#products">Fashion</a>
        <a href="#products">Electronics</a>
        <a href="#cart">Cart</a>
      </nav>

      <section className="hero" id="home">
        <div>
          <h1>Amazon Great Shopping Festival</h1>
          <p>
            Search and shop phones, laptops, shoes, watches, headphones, bags,
            kitchen products, fashion and beauty items.
          </p>
          <a href="#products" className="heroBtn">
            Shop now
          </a>
        </div>
      </section>

      <main className="main" id="products">
        <section className="catalog">
          <div className="catalogHeader">
            <h2>Amazon Products</h2>
            <p>
              Showing {filteredProducts.length} result
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="noResult">No products found. Try another search.</div>
          ) : (
            <div className="productGrid">
              {filteredProducts.map((product) => (
                <article className="productCard" key={product.id}>
                  <span className="tag">{product.tag}</span>

                  <div className="imageBox">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(event) => handleImageError(event, product)}
                    />
                  </div>

                  <div className="productInfo">
                    <h3>{product.name}</h3>
                    <p className="brand">Brand: {product.brand}</p>

                    <p className="rating">
                      ★★★★★ <span>{product.rating}</span> | {product.reviews} reviews
                    </p>

                    <p className="price">{formatPrice(product.price)}</p>
                    <p className="mrp">M.R.P. {formatPrice(product.mrp)}</p>

                    <p className="offer">{product.offer}</p>
                    <p className="deliveryText">{product.delivery}</p>

                    <div className="options">
                      {product.options.map((option) => (
                        <span key={option}>{option}</span>
                      ))}
                    </div>

                    <div className="buttons">
                      <button onClick={() => addToCart(product)}>Add to Cart</button>
                      <button className="buyNow">Buy Now</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="orderBox" id="cart">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            <>
              <div className="cartList">
                {cart.map((item) => (
                  <div className="cartItem" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(event) => handleImageError(event, item)}
                    />

                    <div>
                      <h4>{item.name}</h4>
                      <p>
                        {item.quantity} x {formatPrice(item.price)}
                      </p>

                      <div className="qty">
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              <p>
                Items: <b>{cartCount}</b>
              </p>

              <p>
                Delivery: <b>FREE</b>
              </p>

              <h3>Total: {formatPrice(cartTotal)}</h3>

              <button className="checkout">Proceed to Buy</button>
            </>
          )}
        </aside>
      </main>

      <footer>
        <h2>Amazon Webpage</h2>
        <p>Login | Account | Orders | Returns | Customer Service</p>
      </footer>
    </div>
  );
}

export default App;