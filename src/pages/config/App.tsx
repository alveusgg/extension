//components
import Config from './components/Config';
import AnimalEditor from './components/animalEditor/AnimalEditor';
import { AnimalCardProps } from '../../utils/animalCard/AnimalCard';

//routing
import { HashRouter, Routes, Route } from 'react-router-dom';

//lifecycle hooks 
import { useState } from 'react';

export default function App() {
  const [animalCard, setAnimalCard] = useState<AnimalCardProps["cardData"]>({
    img: {
      src: '',
      altText: '' 
    }, 
    name: '', 
    scientificName:'', 
    species: '', 
    sex: '', 
    dateOfBirth: new Date(), 
    story: '', 
    conservationMission: ''
  })
  
  function handleEditForm(inputProperty: string, inputValue: string): void{
    setAnimalCard({
      ...animalCard,
      [inputProperty]: inputValue
    })
  }

  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Config handleEditCard={(animal)=>{setAnimalCard(animal)}}/>} />
          <Route path="/animalEditor" element={
            <AnimalEditor 
              cardData={animalCard} 
              onEditForm={(inputProperty: string, inputValue: string)=>handleEditForm(inputProperty, inputValue)}/>} 
          />
      </Routes>
    </HashRouter>
  )
}
