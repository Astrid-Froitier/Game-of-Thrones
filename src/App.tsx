import { HashRouter, Route, Routes } from 'react-router-dom';

import Families from './component/Families';
import Home from './component/Home';
import Houses from './component/Houses';
import Navbar from './component/Navbar';

import './App.scss';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/families" element={<Families />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
