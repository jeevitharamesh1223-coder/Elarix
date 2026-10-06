import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQty } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="container my-2">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div style={{ padding: '3rem 0' }}>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>Continue Shopping</Link>
        </div>
      ) : (
        <div className="flex gap-1" style={{ flexWrap: 'wrap', marginTop: '2rem' }}>
          <div style={{ flex: '1 1 600px' }}>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="flex items-center gap-1">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <Link to={`/product/${item.id}`} style={{ fontWeight: 'bold' }}>{item.name}</Link>
                    <div style={{ color: 'var(--primary)', marginTop: '0.5rem' }}>₹{item.price}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <select 
                    value={item.qty} 
                    onChange={e => updateCartQty(item.id, e.target.value)}
                    className="form-control"
                    style={{ width: '60px', padding: '0.3rem' }}
                  >
                    {[...Array(10).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--error)' }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h2>Order Summary</h2>
            <div className="flex justify-between" style={{ margin: '1rem 0', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button className="btn" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
