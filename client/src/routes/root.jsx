import Footer from '../components/forms/Footer';
import Header from '../components/forms/Header';

export default function Root() {
  return (
    <>
      <Header />
      <div className='home_page_container'>
        <div style={{ textAlign: 'center' }} className=''>
          <h2>
            <b>Bienvenue chez Quick & Tasty</b>
          </h2>
          <a href='Menu' className='menu-btn'>
            <h1>Notre Menu</h1>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
