import "./Pokedex.css";
import { DexEntry } from "../index";

export default function Pokedex(props) {
  const { pokedex, hoverHandler, api, machines } = props;

  return (
    <section className="pokedex">
      {pokedex.pokemon_entries.map((mon) => 
        <DexEntry 
          key={mon.entry_number}
          mon={mon} 
          hoverHandler={(name) => hoverHandler(name)} 
          api={api}
          machines={machines}
        />
      )}
    </section>
  );
}