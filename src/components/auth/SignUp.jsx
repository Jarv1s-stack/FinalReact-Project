import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setShowAnimation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((user) => user.email === email)) {
      setError('Email already registered');
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ email }));
    localStorage.setItem('showAnimation', 'true');

    if (setShowAnimation) {
      setShowAnimation();
    }
    navigate('/');
  };

  return (
    <section className="contact-section min-h-screen flex items-center justify-center">
      <div className="contact-container max-w-md w-full">
        <div className="section-header">
          <h2 className="back-title">Sign Up</h2>
          <h2 className="front-title">Create Account</h2>
          <p>Register to access Ayan's Portfolio</p>
        </div>
        <form className="contact-form" onSubmit={handleSignUp}>
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
          <button type="submit" className="submit-btn">Sign Up</button>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <a href="/signin" className="text-primary-color hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </section>
  );
}