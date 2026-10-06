import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Demo)');
  const [success, setSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to place an order");
      navigate('/login?redirect=/checkout');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      const orderData = {
        orderItems: cartItems.map(item => ({ product: item.id, qty: item.qty, price: item.price })),
        shippingAddress: address,
        paymentMethod,
        totalPrice: subtotal
      };

      await axios.post('http://localhost:5000/api/orders', orderData, config);
      setSuccess(true);
      clearCart();
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    }
  };

  if (success) {
    return (
      <div className="container my-2 text-center">
        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
        <p>Thank you for shopping with ELARIX.</p>
        <p style={{ marginTop: '1rem', color: '#666' }}>This is a demo checkout. No real payments were processed.</p>
        <button className="btn my-2" onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container my-2">
        <p>Your cart is empty.</p>
        <button className="btn" onClick={() => navigate('/')}>Go Shop</button>
      </div>
    );
  }

  return (
    <div className="container my-2 flex gap-1" style={{ flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 500px' }}>
        <h2>Shipping Information</h2>
        <form onSubmit={submitHandler} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <input required type="text" name="name" value={address.name} onChange={handleChange} placeholder="Full Name" className="form-control" />
          </div>
          <div className="form-group">
            <input required type="text" name="phone" value={address.phone} onChange={handleChange} placeholder="Phone Number" className="form-control" />
          </div>
          <div className="form-group">
            <input required type="text" name="addressLine" value={address.addressLine} onChange={handleChange} placeholder="Address" className="form-control" />
          </div>
          <div className="flex gap-1" style={{ marginBottom: '1rem' }}>
            <input required type="text" name="city" value={address.city} onChange={handleChange} placeholder="City" className="form-control" />
            <input required type="text" name="state" value={address.state} onChange={handleChange} placeholder="State" className="form-control" />
          </div>
          <div className="form-group">
            <input required type="text" name="pincode" value={address.pincode} onChange={handleChange} placeholder="Pincode" className="form-control" />
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Payment Method</h3>
          <div className="form-group">
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="form-control">
              <option value="Credit Card (Demo)">Credit Card (Demo)</option>
              <option value="UPI (Demo)">UPI (Demo)</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Place Order</button>
        </form>
      </div>

      <div style={{ flex: '1 1 350px', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', height: 'fit-content' }}>
        <h2>Order Summary</h2>
        <div style={{ margin: '1.5rem 0', padding: '1rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem' }}>{item.qty} x {item.name}</span>
              <span>₹{(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
