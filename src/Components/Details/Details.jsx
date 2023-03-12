import "./Details.css";
import { Type, Locations, Moves } from "../index";

export default function Details(props) {
  const { api, machines, mon } = props;
  return (
    <section className="details">
      <h3>Details</h3>
      <Type name={mon.types[0].type.name} />
      {mon.types[1] && <Type name={mon.types[1].type.name} />}
      <br/>
      <Locations index={mon.id} api={api} targets={['gold','silver','crystal']} />
      <Moves moves={mon.moves} machines={machines} />
    </section>
  );
}