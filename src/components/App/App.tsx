import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import MemoTest from '../MemoTest/MemoTest';
import DeckEditor from '../DeckEditor/DeckEditor';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memoTest/:id" element={<MemoTest />} />
        <Route path="/deckEditor/:id" element={<DeckEditor />} />
      </Routes>
    </div>
  );
}

export default App;
