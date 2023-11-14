import { createRef, useState } from "react";
import classes from "./InputItemsList.module.css";
import SecretSanta from "../models/SecretSanta";

export default function InputItemList(props) {
  const inputRef = createRef();
  const [error, setError] = useState("");

  const placeholder =
    "# You can add a user by adding a line \n\
     Santa \n\n\
# You can prevent someone from being paired with someone else \n\
     Maël !Aurélie \n\
     Aurélie !Maël \n\
  ";

  const submitHandler = (event) => {
    event.preventDefault();
    let content = inputRef.current.value;
    content = content.replace(/(\r\n|\r)/g, "\n");
    content = content.replace(/[ \t]+/g, " ");
    content = content.replace(/^ | $/gm, "");
    content = content.replace(/^#.*$/gm, "");
    content = content.replace(/\n+/g, "\n");
    content = content.replace(/^\n|\n$/g, "");
    var lines = content.split(/\n/g);

    if (lines.length === 0 || (lines.length === 1 && lines[0].length === 0)) {
      setError("empty input");
      return;
    }

    const santa = new SecretSanta();

    for (var t = 0, T = lines.length; t < T; ++t) {
      var match = lines[t].match(
        /^((?:(?![!=]).)+)((?: [!=](?:(?! [!=]).)+)*)$/
      );

      if (!match) {
        setError('Syntax error: "' + lines[t] + "\" isn't valid");
        return;
      }

      var name = match[1];
      var rules = match[2] ? match[2].match(/[!=][^!=]+/g) : null;

      var person = santa.add(name);

      if (rules) {
        for (var u = 0, U = rules.length; u < U; ++u) {
          person["blacklist"](rules[u].slice(1).trim());
        }
      }
    }

    props.handler(santa)
  };
  return (
    <>
      <form id="form" className={classes.part} onSubmit={submitHandler}>
        {error && <p style={{background: "red"}}>Error : {error}</p>}
        <textarea
          id="input"
          className={classes.input}
          placeholder={placeholder}
          ref={inputRef}
          autoFocus
        ></textarea>
        <button type="submit" className={classes.generate}>
          Generate your pairings
        </button>
      </form>
    </>
  );
}
