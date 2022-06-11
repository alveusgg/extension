import Config from './components/Config';
import AnimalEditor from './components/animalEditor/AnimalEditor';
import { HashRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Config/>} />
          <Route path="/animalEditor" element={<AnimalEditor/>} />
      </Routes>
    </HashRouter>
  )
}
