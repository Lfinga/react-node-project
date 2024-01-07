import { useNavigate } from 'react-router-dom';
import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';
import { userSignup } from '../services';

export default function Signup() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('target', e.target.password.value);
    const firstName = e.target.first_name.value;
    const lastName = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.password_Confirm.value;
    const response = await userSignup(firstName, lastName, email, password, passwordConfirm);
    if (response.ok) navigate('/Login');
  }
  return (
    <>
      <Header />
      <div className='page_container'>
        <div className='signup-container'>
          <form id='signup-form' onSubmit={handleSubmit}>
            <label>
              <b>First Name</b>
            </label>
            <input type='text' id='first_name' placeholder='First Name' />
            <br />
            <label>
              <b>Last Name</b>
            </label>
            <input type='text' id='last_name' placeholder='Last Name' />
            <br />
            <label>
              <b>E-mail</b>
            </label>
            <input type='text' id='email' placeholder='Email' />
            <br />
            <label>
              <b>Password</b>
            </label>
            <input type='Password' id='password' placeholder='Password' />
            <br />
            <label>
              <b>Confirm Password</b>
            </label>
            <input type='Password' id='password_Confirm' placeholder='Confirm Password' />
            <br />
            <button className='signup-btn' id='signup' value='Signup'>
              Signup
            </button>
            <br />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
