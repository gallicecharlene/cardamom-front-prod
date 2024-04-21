import { ChangeEvent, FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { LuImport } from 'react-icons/lu';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchImportDeck } from '../../../redux/Deck/action';

function ImportDeck() {
  const dispatch = useAppDispatch();
  const [importCode, setImportCode] = useState('');
  const token = Cookies.get('jwtToken');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const importCodeHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImportCode(event.target.value);
  };

  const handleShareDeck = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(token, 'token envoyé');
    if (!token) {
      console.error('Token JWT non trouvé');
      return;
    }
    if (importCode === '') {
      alert('veuillez entrer un code');
      return;
    }
    const shareId = importCode;
    dispatch(fetchImportDeck({ token, shareId }));
    toast.success('Le deck a bien été importé');
    console.log('Deck importé ');
    handleCloseModal();
  };

  return (
    <div>
      {isModalOpen ? (
        <div className="icone">
          <div className="modal">
            <div className="modal-content">
              <h2 className="titleImport">Importer Deck</h2>
              <form onSubmit={handleShareDeck}>
                <input
                  className="SearcBar"
                  placeholder="Code du deck"
                  type="text"
                  id="title"
                  value={importCode}
                  onChange={importCodeHandleChange}
                />
                <button type="button">Valider</button>
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
        </div>
      ) : (
        <button
          aria-label="modal"
          type="button"
          className="buttonIcone"
          onClick={handleOpenModal}
        >
          <LuImport />
        </button>
      )}
    </div>
  );
}

export default ImportDeck;
