import React, { useState, useEffect } from 'react';
import './App.css';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [freeGiftAdded, setFreeGiftAdded] = useState(false);

  useEffect(() => {
    calculateSubtotal();
    checkForFreeGift();
  }, [cart]);

  const calculateSubtotal = () => {
    const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setSubtotal(subtotal);
  };

  const checkForFreeGift = () => {
    if (subtotal >= THRESHOLD && !freeGiftAdded) {
      setCart([...cart, FREE_GIFT]);
      setFreeGiftAdded(true);
      alert("Congratulations! You've earned a free Wireless Mouse!");
    }
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (product, quantity) => {
    setCart(cart.map((item) => item.id === product.id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return (
    <div className="app">
      <h1 className='heading'>Shopping Cart</h1>
      <h1 className="title">Products</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price}</span>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h1 className="title">Cart</h1>
      {subtotal >= THRESHOLD && (
        <p className="free-gift-message">You Got A Free Wireless Mouse!</p>
      )}
      <ul className="cart-list">
        {cart.map((product) => (
          <li key={product.id} className="cart-item">
            <span className="product-name">{product.name}</span>
            <span className="product-quantity">x {product.quantity}</span>
            <span className="product-price">${product.price * product.quantity}</span>
            <button className="update-quantity-button" onClick={() => handleUpdateQuantity(product, product.quantity - 1)}>-</button>
            <button className="update-quantity-button" onClick={() => handleUpdateQuantity(product, product.quantity + 1)}>+</button>
            <button className="remove-from-cart-button" onClick={() => handleRemoveFromCart(product)}>Remove</button>
          </li>
        ))}
      </ul>

      <h1 className="title">Subtotal: ${subtotal}</h1>
      <progress className="progress-bar" value={subtotal} max={THRESHOLD} />
      <span className="progress-text">{Math.round(subtotal / THRESHOLD * 100)}% to free gift</span>
    </div>
  );
}

export default App;