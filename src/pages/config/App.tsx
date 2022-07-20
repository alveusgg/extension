//components
import Config from './components/Config';
import AnimalEditor from './components/animalEditor/AnimalEditor';
import { AnimalCardProps } from '../../utils/animalCard/AnimalCard';

//routing
import { HashRouter, Routes, Route } from 'react-router-dom';

//lifecycle hooks 
import { ChangeEvent, useState } from 'react';

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
  function handleEditImg(event: ChangeEvent<HTMLInputElement>): void{
    const target = event.target as HTMLInputElement;
    if(target.files && target.files.length > 0) {
        const file = target.files[0]
        setAnimalCard({
          ...animalCard,
          img: {
            src: URL.createObjectURL(file),
            altText: file.name
          }
        })
    }else{
        new Error("Error: no file selected")
    }
  }
  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Config handleEditCard={(animal)=>{setAnimalCard(animal)}}/>} />
          <Route path="/animalEditor" element={
            <AnimalEditor 
              cardData={{
                ...animalCard,
                img: {
                  //! MESSY
                  src: animalCard.img.src.includes("http") // if it's a url, don't change it
                    || animalCard.img.src.includes("unknown")?  // if it's a default image, don't change it
                    animalCard.img.src : "http://localhost:3000/images/"+animalCard.img.src, 
                  altText: animalCard.img.altText,
                }
              }}
              onChangeImg={(inputValue)=>handleEditImg(inputValue)}
              onEditForm={(inputProperty: string, inputValue: string)=>handleEditForm(inputProperty, inputValue)}/>} 
          />
      </Routes>
    </HashRouter>
  )
}
