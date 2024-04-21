import AddDeck from './AddDeck/AddDeck';
import ImportDeck from './ImportDeck/ImportDeck';
import './Icone.scss';

function Icone() {
  return (
    <div className="homeIcone">
      <AddDeck />
      <ImportDeck />
    </div>
  );
}

export default Icone;
