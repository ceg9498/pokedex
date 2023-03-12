import { useState } from 'react';
import './DexEntry.css';
import { Details } from '../index';

export default function DexEntry(props) {
  const [viewing, setViewing] = useState(null);

  if (!props) return (<span>Pokedex information not provided.</span>);

  const number = props.mon.entry_number;
  const name = props.mon.pokemon_species.name;
  const { hoverHandler, api, machines } = props;

  return (
    <div className="pokedex-entry">
      <div
        className="name-tile"
        onMouseEnter={()=>hoverHandler(name)}
        onClick={() => {
          if (viewing) {
            setViewing(null)
          } else {
            api.getPokemonByName(name).then(res => {
              setViewing(res);
              console.log(res);
            }).catch(e => {
              console.error("[ERROR]",e);
            });
          }
        }}
      >
        <span className="number">#{number}</span>
        <span className="name">{capitalize(name)}</span>
      </div>
      {viewing && <Details name={capitalize(name)} mon={viewing} machines={machines} />}
    </div>
  );
}

function capitalize(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1);
}