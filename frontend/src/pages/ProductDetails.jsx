import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (!product) return <div className="container my-2">Loading...</div>;

  return (
    <div className="container my-2 flex gap-1" style={{ flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 400px' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px' }} />
      </div>
      
      <div style={{ flex: '1 1 500px', padding: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>
        <p style={{ color: '#888', marginBottom: '1rem' }}>{product.rating} ★ ({product.numReviews} reviews)</p>
        <h2 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '1.5rem' }}>₹{product.price}</h2>
        
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>{product.description}</p>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Suitable for:</strong> {product.skinType || 'All skin types'}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
          <label>Quantity:</label>
          <select value={qty} onChange={e => setQty(Number(e.target.value))} className="form-control" style={{ width: '80px' }}>
            {[...Array(5).keys()].map(x => (
              <option key={x + 1} value={x + 1}>{x + 1}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn" style={{ flex: 1 }} onClick={handleBuyNow}>Buy Now</button>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Benefits</h3>
          <p style={{ padding: '1rem 0' }}>{product.benefits}</p>
          
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Ingredients</h3>
          <p style={{ padding: '1rem 0' }}>{product.ingredients}</p>
          
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>How to Use</h3>
          <p style={{ padding: '1rem 0' }}>{product.howToUse}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
