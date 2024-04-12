import { ChangeEvent, useState } from 'react';
import { deckCreate } from '../../redux/Deck/action';
import './Icone.scss';
import { useAppDispatch } from '../../hooks/redux';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function Icone() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setDeckTitle] = useState('');
  const token = Cookies.get('jwtToken');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const titleHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(event.target.value);
  };
  const handleCreateDeck = async () => {
    setIsModalOpen(false);
    setDeckTitle('');
    try {
      console.log('requete api pour créer el deck jenvoie :', title);
      const response = await dispatch(deckCreate({ token, title }));
      const newDeck = response.payload;
      //const newDeckId = newDeck.id;
      //  window.location.href = `/DeckEditor/${newDeckId}`;
    } catch (error) {
      console.error('Erreur lors de la création du deck:', error);
    }
  };

  return (
    <div className="icone">
      {!isModalOpen && (
        <>
          <button className="buttonIcone" onClick={handleOpenModal}>
            +
          </button>
          <button className="buttonIcone">↓</button>
          <button className="buttonIcone">lll</button>
        </>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Votre nouveau Deck</h2>
            <form>
              <span>Titre</span>
              <input
                className="SearcBar"
                type="text"
                id="title"
                value={title}
                onChange={titleHandleChange}
              />
              <Link
                to="/DeckEditor/${newDeckId}"
                className="button-modal"
                onClick={handleCreateDeck}
              >
                Créer
              </Link>

              <button
                className="button-modal"
                type="button"
                onClick={handleCloseModal}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Icone;
