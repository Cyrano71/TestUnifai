import { useState } from "react";
import classes from "./ListItems.module.css";

export default function ListItems() {
  const [items, setItems] = useState(null);
  const listItemsHandler = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/previous/",
      {}
    );
    const content = await response.json();
    setItems(content);
  };

  return (
    <>
      <button
        type="submit"
        className={classes.generate}
        onClick={listItemsHandler}
      >
        List previous SecretSantas
      </button>
      {items && (
        <div className={classes.result}>
          {Object.keys(items).map((keyName, i) => {
            return (
              <div>
                <h3 className={classes.header}>Secret Santa nb {i}</h3>
                <ul>
                  {items[keyName]["pairings"].map((pairing) => {
                    return (
                      <li key={pairing["player"]}>
                        {pairing["player"]} paired with {pairing["pairing"]}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
