import { ChangeEvent, FormEvent, useState } from 'react';

import fetchImportDeck from '../../../redux/ImportDeck/action';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Cookies from 'js-cookie';

function ImportDeck() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importCode, setImportCode] = useState('');
  const token = Cookies.get('jwtToken');
  const deckList = useAppSelector((state) => state.deck.list);

  //Pour que pouvoir rentrer un code dans la modale de partage
  const importCodeHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImportCode(event.target.value);
  };

  const handleShareDeck = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = dispatch(fetchImportDeck(importCode));

    const importedDeck = response.payload;
    if (importedDeck) {
      console.log('Deck importé avec succès :', importedDeck);
    } else {
      console.error('Deck avec share_id non trouvé :', importCode);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="icone">
      {!isModalOpen && (
        <>
          <button className="buttonIcone" onClick={handleOpenModal}>
            ouvre la modal
          </button>
        </>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Importer Deck</h2>
            <form>
              <span>Code du deck</span>
              <input
                className="SearcBar"
                type="text"
                id="title"
                value={importCode}
                onChange={importCodeHandleChange}
              />
              <button className="button-modal" onClick={handleShareDeck}>
                Importer le deck
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

export default ImportDeck;
