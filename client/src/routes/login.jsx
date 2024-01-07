import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';
import { useLoginContext } from '../hooks/useLoginContext';
import { loginUser } from '../services';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  // const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const navigate = useNavigate();
  async function loginPress(e) {
    e.preventDefault();
    const response = await loginUser(email, password);
    if (response.status == '401') {
      setIsLoggedIn(false);
    } else {
      console.log('here');
      setIsLoggedIn(true);
      navigate('/Menu');
    }
    console.log('isLoggedIn', isLoggedIn);
  }
  const emailChange = (e) => {
    console.log('email', e.target.value);
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    console.log('password', e.target.value);

    setPassword(e.target.value);
  };
  return (
    <>
      <Header />
      <div className='page_container'>
        <div className='login-container'>
          <form id='login' onSubmit={loginPress}>
            <label>
              <b>E-mail</b>
            </label>
            <input type='text' id='email' placeholder='Email' onChange={emailChange} />
            <br />
            <label>
              <b>Password</b>
            </label>
            <input type='Password' id='pass' placeholder='Password' onChange={passwordChange} />
            <br />
            <button id='log' className='login-btn'>
              Log in Here
            </button>
            <br />
            <input type='checkbox' id='check' />
            <span>Remember me</span>
            <br />
            <span className='password'>
              Forgot <a href='#'>Password?</a>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
