import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import MemoTest from '../MemoTest/MemoTest';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memoTest/:id" element={<MemoTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
