import { HashRouter, Route, Routes } from 'react-router-dom';

import Characters from './component/Characters';
import Home from './component/Home';
import Houses from './component/Houses';

import './App.scss';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
