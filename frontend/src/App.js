import { useState } from 'react';
import './App.css';
import InputItemList from './components/InputItemsList';
import Result from './components/Result';

function App() {
  const [pairings, setPairing] = useState(null)
  const inputHandler = (secretSanta) => {
    setPairing(secretSanta.generate())
  }
  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
     <InputItemList handler={inputHandler}/>
     <Result pairings={pairings}/>
    </div>
  );
}

export default App;
