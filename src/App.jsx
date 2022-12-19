import { HashRouter, Route, Routes } from 'react-router-dom';

import CharacterDesc from './component/CharacterDesc';
import CharactersList from './component/CharactersList';
import Home from './component/Home';
import HouseDesc from './component/HouseDesc';
import HousesList from './component/HousesList';

import './App.scss';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/houses" element={<HousesList />} />
          <Route path="/characters/:id" element={<CharacterDesc />} />
          <Route path="/houses/:id" element={<HouseDesc />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
