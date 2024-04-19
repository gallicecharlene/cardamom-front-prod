import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { fetchImportDeck } from '../../../redux/Deck/action';

function ImportDeck() {
  const dispatch = useAppDispatch();
  const [importCode, setImportCode] = useState('');
  const token = Cookies.get('jwtToken');

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
    const shareId = importCode;
    dispatch(fetchImportDeck({ token, shareId }));
    toast.success('Le deck a bien été importé');
    console.log('Deck importé ');
  };

  return (
    <div className="icone">
      <div className="modal">
        <div className="modal-content">
          <h2>Importer Deck</h2>
          <form onSubmit={handleShareDeck}>
            <span>Code du deck</span>
            <input
              className="SearcBar"
              type="text"
              id="title"
              value={importCode}
              onChange={importCodeHandleChange}
            />
            <button>Valider</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImportDeck;

//1712873426116x7
