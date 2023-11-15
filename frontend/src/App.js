import { useEffect, useState } from "react";
import "./App.css";
import InputItemList from "./components/InputItemsList";
import Result from "./components/Result";
import ListItems from "./components/ListItems";

function App() {
  const [pairings, setPairing] = useState(null);
  const inputHandler = (secretSanta) => {
    setPairing(secretSanta.generate());
  };
  useEffect(() => {
    async function SendSecretSanta() {
      const data = { 
        pairings: [],
        pub_date: new Date().toJSON() 
      };
      for (const key in pairings){
        data.pairings.push({"player": key, "pairing": pairings[key]})
      }
      const url = process.env.REACT_APP_BACKEND_URL + "api/create/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    SendSecretSanta();
  }, [pairings]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InputItemList handler={inputHandler} />
      <Result pairings={pairings} />
      <ListItems />
    </div>
  );
}

export default App;
