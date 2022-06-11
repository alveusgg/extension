import React from 'react';
import ReactDOM from 'react-dom/client';

import Config from './components/Config';
import AnimalEditor from './components/animalEditor/AnimalEditor';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <React.StrictMode>
      <HashRouter>
        <Routes>
            <Route path="/" element={<Config/>} />
            <Route path="/animalEditor" element={<AnimalEditor/>} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
);