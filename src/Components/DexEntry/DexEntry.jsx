import { useState } from 'react';
import './DexEntry.css';
import { Details } from '../index';
import { capitalize } from '../../Utilities';

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
            setViewing(null);
          } else {
            api.getPokemonByName(name).then(pokemon => {
              setViewing(pokemon);
            }).catch(e => {
              console.error("[ERROR]",e);
            });
          }
        }}
      >
        <span className="number">#{number}</span>
        <span className="name">{capitalize(name)}</span>
      </div>
      {viewing &&
        <Details
          name={capitalize(name)}
          mon={viewing}
          machines={machines}
          api={api}
        />
      }
    </div>
  );
}