import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlistItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x.id === product.id);
      if (existItem) {
        return prev.map(x => x.id === existItem.id ? { ...existItem, qty: existItem.qty + qty } : x);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(x => x.id !== id));
  };

  const updateCartQty = (id, qty) => {
    setCartItems(prev => prev.map(x => x.id === id ? { ...x, qty: Number(qty) } : x));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(x => x.id === product.id);
      if (exists) {
        return prev.filter(x => x.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateCartQty, clearCart,
      wishlistItems, toggleWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};
