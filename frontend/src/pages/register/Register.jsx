import './Register.css';
import Navbar from '../../components/navbar/Navbar';
const Register = () => {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Sign Up</h1>
        <form
          action='http://localhost:5000/register'
          className='container'
          method='post'>
          <input type='text' placeholder='Username' name='userName' />
          <input type='password' placeholder='Password' name='passWord' />
          <button type='submit'>Create Acount</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
