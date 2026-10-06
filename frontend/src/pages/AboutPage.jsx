import React from 'react';

const AboutPage = () => {
  return (
    <div className="container my-2">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>About ELARIX</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>
          ELARIX is a modern beauty brand focused on helping people discover makeup and skincare products that fit their personal style and routine.
        </p>
      </div>

      <div className="flex gap-1" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800" alt="About ELARIX" style={{ width: '100%', borderRadius: '12px' }} />
        </div>
        <div style={{ flex: '1 1 400px', padding: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
            We believe that beauty is not about hiding your flaws, but about highlighting your unique features. Our mission is to provide high-quality, cruelty-free, and inclusive beauty products that empower you to feel confident in your own skin.
          </p>
          <h2 style={{ marginBottom: '1rem' }}>Our Promise</h2>
          <ul style={{ listStylePosition: 'inside', lineHeight: '2' }}>
            <li>100% Cruelty-Free</li>
            <li>Premium Ingredients</li>
            <li>Inclusive Shade Ranges</li>
            <li>Sustainable Packaging (Coming Soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
