import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deckCreate } from '../../redux/Deck/action';
import { DeckData } from '../../types';
import { Deck } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Icone.scss';

function Icone() {
  const { list, isPending } = useSelector((state: RootState) => state.deck);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DeckData>({ title: '' });
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '' });
  };

  const handleCreateDeck = async () => {
    try {
      const response = await dispatch(deckCreate({ title: formData.title }));
      const newDeck = response.payload;
      const newDeckId = newDeck.id;
      setIsModalOpen(false);
      setFormData({ title: '' });
      window.location.href = `/memoTest/${newDeckId}`;
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
                value={formData.title}
                onChange={(event) => setFormData({ title: event.target.value })}
              />
              <button
                className="button-modal"
                type="button"
                onClick={handleCreateDeck}
              >
                Créer
              </button>
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
