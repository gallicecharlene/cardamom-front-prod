import Card from '../Card/Card';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function MemoTest() {
  return (
    <div className="memo-test">
      <AppHeader />
      <Card recto="recto" verso="verso" />
      <Link to="/" className="return-button">
        Retour à l'accueil
      </Link>

      <Footer />
    </div>
  );
}

export default MemoTest;
