import "./Details.css";
import { Type, Moves } from "../index";

export default function Details(props) {
  const { machines, mon } = props;
  return (
    <section className="details">
      <h3>Details</h3>
      <Type name={mon.types[0].type.name} />
      {mon.types[1] && <Type name={mon.types[1].type.name} />}
      <br/><br/>
      <Moves moves={mon.moves} machines={machines} />
    </section>
  );
}