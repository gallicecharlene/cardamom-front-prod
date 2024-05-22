import './ErrorPage.scss';
import AppHeader from '../AppHeader/AppHeader';
import HomeButton from '../HomeButton/HomeButton';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';

function ErrorPage() {
  return (
    <>
      <AppHeader>
        <HomeButton />
      </AppHeader>
      <div className="error-message">
        <h1>ERREUR 404</h1>
        <em> PAGE INTROUVABLE</em>
        <Card recto="ERREUR" verso="404" />
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
