import classes from "./Result.module.css";

export default function Result(props) {
  let className = `${classes.result} ${classes.none}`;
  if (props.pairings) {
    className = classes.result;
  }
  return (
    <div id="result" className={className}>
      <table className={classes["result-table"]}>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Pairing</th>
        </tr>

        {props.pairings &&
          Object.entries(props.pairings).map((array) => {
            console.log(array);
            const key = array[0];
            const value = array[1];
            return (
              <tr key={key} className={classes["result-row"]}>
                <td className={classes["result-name"]}>{key}</td>
                <td className={classes["result-link"]}>{value}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
