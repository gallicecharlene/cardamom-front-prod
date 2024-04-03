import { useState } from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './MemoTest.scss';

function MemoTest() {
  const [know, setKnow] = useState(false);

  const handleKnow = () => {
    setKnow(true);
  };

  const handleUnknow = () => {
    setKnow(false);
  };

  console.log(handleKnow);
  console.log(handleUnknow);

  return (
    <div className="memo-test">
      <AppHeader>
        <Link to="/" className="return-button">
          ACCUEIL
        </Link>
      </AppHeader>
      <Card recto="recto" verso="verso" />
      <div className="know-button">
        <button onClick={handleUnknow}>Je sais pas</button>
        <button onClick={handleKnow}>Je sais</button>
      </div>
      <Footer />
    </div>
  );
}

export default MemoTest;
