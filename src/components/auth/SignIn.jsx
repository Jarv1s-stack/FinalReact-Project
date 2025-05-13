import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn({ setShowAnimation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify({ email }));
    localStorage.setItem('showAnimation', 'true');
    setShowAnimation();
    navigate('/');
  };

  return (
    <section className="contact-section min-h-screen flex items-center justify-center">
      <div className="contact-container max-w-md w-full">
        <div className="section-header">
          <h2 className="back-title">Sign In</h2>
          <h2 className="front-title">Welcome Back</h2>
          <p>Log in to access Ayan's Portfolio</p>
        </div>
        <form className="contact-form" onSubmit={handleSignIn}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="submit-btn">Sign In</button>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary-color hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </section>
  );
}