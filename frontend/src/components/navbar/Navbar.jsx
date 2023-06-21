import { useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [islogin, setIsLogin] = useState(true);

  // const user = props.user;
  // const hotel = props.hotel;

  // const handleClick = () => {
  //   if (!props.user) return;
  //   if (props.user) {
  //     navigate('/transaction', { state: { user, hotel } });
  //   } else {
  //     return;
  //   }
  // };

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo'>Booking Website</span>
        {user && islogin ? (
          <div className='navItems'>
            <p>{user.userName}</p>
            <button
              className='navButton'
              onClick={e => {
                navigate('/transaction', { state: { user } });
              }}>
              Transaction
            </button>
            <button
              className='navButton'
              onClick={() => {
                setIsLogin(false);
                navigate('/login');
              }}>
              Log Out
            </button>
          </div>
        ) : (
          <div className='navItems'>
            <button
              className='navButton'
              onClick={() => {
                navigate('/register');
              }}>
              Register
            </button>
            <button
              className='navButton'
              onClick={() => {
                navigate('/login');
              }}>
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
