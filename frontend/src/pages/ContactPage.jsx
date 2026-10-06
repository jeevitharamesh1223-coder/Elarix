import React, { useState } from 'react';

const ContactPage = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="container my-2">
      <h1 className="text-center" style={{ marginBottom: '3rem' }}>Contact Us</h1>
      
      <div className="flex gap-1" style={{ flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          {success ? (
            <div className="text-center" style={{ padding: '2rem 0' }}>
              <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Thank You!</h2>
              <p>Your message has been sent successfully. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>Send Message</button>
            </form>
          )}
        </div>

        <div style={{ flex: '1 1 400px', padding: '2rem' }}>
          <h2>Get in Touch</h2>
          <p style={{ margin: '1rem 0' }}>We'd love to hear from you! Whether you have a question about our products, need help with an order, or just want to say hi, feel free to reach out.</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Customer Support</h3>
            <p>Email: support@elarix.com</p>
            <p>Phone: +91 123 456 7890</p>
            <p>Hours: Mon-Fri, 9am - 5pm IST</p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Follow Us</h3>
            <p>Instagram: @elarixbeauty</p>
            <p>Twitter: @elarixbeauty</p>
            <p>Facebook: /elarixbeauty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
