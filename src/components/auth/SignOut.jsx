import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/signin');
  };

  return (
    <button
      onClick={handleSignOut}
      className="theme-toggle text-primary-color hover:text-secondary-color transition-all"
      title="Sign Out"
    >
      <i className="fas fa-sign-out-alt"></i>
    </button>
  );
}