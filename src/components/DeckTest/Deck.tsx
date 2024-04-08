import { Link } from 'react-router-dom';
import './Deck.scss';
function Deck() {
  return (
    <div className="deck">
      <Link to="/memoTest" className="button">
        Lexique portugais
      </Link>
    </div>
  );
}

export default Deck;
