import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = await login(email, password);
      if (!res.success) setError(res.message);
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const res = await register(name, email, password);
      if (!res.success) setError(res.message);
    }
  };

  return (
    <div className="container my-2" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h2 className="text-center" style={{ marginBottom: '2rem' }}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
        
        {error && <div style={{ color: 'white', backgroundColor: 'var(--error)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className="form-group">
              <input type="text" placeholder="Name" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <input type="email" placeholder="Email Address" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {!isLogin && (
            <div className="form-group">
              <input type="password" placeholder="Confirm Password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          {isLogin ? (
            <p>New to ELARIX? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(false)}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(true)}>Sign In</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
