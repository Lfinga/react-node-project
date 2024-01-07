import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../hooks/useLoginContext';
import { logoutUser } from '../../services';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.ok) {
      setIsLoggedIn(false);
      navigate('/');
    }
  };
  console.log('status', isLoggedIn);
  if (!isLoggedIn) {
    return (
      <header className='header'>
        <img className='header-logo' src='./img/logo.png' alt='' />
        <nav className='nav-bar'>
          <a href='/'>Accueil</a>
          <a href='Menu' className='menu'>
            Menu
          </a>

          <a className='login-button' href='Login'>
            Connexion
          </a>
          <a href='Signup' className='signup-button'>
            inscription
          </a>
        </nav>
      </header>
    );
  } else {
    return (
      <header className='header'>
        <img className='header-logo' src='./img/logo.png' alt='' />

        <nav className='nav-bar'>
          <a href='/'>Accueil</a>
          <a href='Menu' className='menu'>
            Menu
          </a>
          <a href='EtatCommande' className='etatCommande'>
            Ma commande
          </a>
          <a className='commande' href='Commande'>
            Panier
          </a>
          <a className='mon-compte' href='Compte'>
            Mon compte
          </a>
          <button onClick={handleLogout} className='logout-btn'>
            Logout
          </button>
        </nav>
      </header>
    );
  }
}
