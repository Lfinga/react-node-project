import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';
import { fetchPasswordChange } from '../services';

export default function Compte() {
  const savePassword = async (e) => {
    e.preventDefault();
    const currentPass = e.target.current_pass.value;
    const newPass = e.target.new_pass.value;
    const confirmPass = e.target.confirm_pass.value;
    await fetchPasswordChange(currentPass, newPass, confirmPass);
  };
  return (
    <>
      <Header />
      <div className='page_container'>
        <div className='account-container'>
          <form id='passwordChange' onSubmit={savePassword}>
            <label>
              <b>Current Password</b>
            </label>
            <input type='Password' id='current_pass' placeholder='Current Password' />
            <br />
            <label>
              <b>New Password</b>
            </label>
            <input type='Password' id='new_pass' placeholder='New Password' />
            <br />
            <label>
              <b>Confirm Password</b>
            </label>
            <input type='Password' id='confirm_pass' placeholder='Confirm Password' />
            <br />
            <button id='save-password' className='password-save-btn'>
              Save password
            </button>
            <br />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
