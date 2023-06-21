import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './Login.css';
import { useRef, useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const passWordRef = useRef();
  const [isShowError, setIsShowError] = useState(false);
  const submitHandler = e => {
    e.preventDefault();
    console.log('ko');
    const postUser = async () => {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({
          username: userNameRef.current.value,
          password: passWordRef.current.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.text === 'error') {
        setIsShowError(true);
      } else {
        navigate('/', { state: { data } });
      }
    };
    postUser();
  };
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Login</h1>
        <form className='container'>
          <input type='text' placeholder='Username' ref={userNameRef} />
          <input type='password' placeholder='Password' ref={passWordRef} />
          {isShowError && <p className='error'>User Not Found!</p>}
          <button onClick={submitHandler}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
