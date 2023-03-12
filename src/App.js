import { useEffect, useState } from 'react';
import './App.css';
import Pokedex from 'pokedex-promise-v2';
import {
  Pokedex as PokeList,
  PokePreview
} from './Components';
import { capitalize } from './Utilities';

const api = new Pokedex();
let machines_list = [];

function App() {
  const [imgAlt, setImgAlt] = useState(null);
  const [selected, setSelected] = useState({sprites: {front_default: ''}});
  const [pokedex, setPokedex] = useState(null);

  useEffect(() => {
    api.getPokedexByName(3).then(res => setPokedex(res));
    if (machines_list.length === 0) {
      let games = ['gold-silver'];
      api.getResource('https://pokeapi.co/api/v2/machine/').then(allRes => {
        const count = allRes.count;
        let mchid = [];
        for (let i = 1; i < 1000; i++) {
          mchid.push(i);
        }
        api.getMachineById(mchid).then(machines => {
          machines.forEach(machine => {
            if (games.includes(machine.version_group.name)) {
              machines_list.push({
                id: machine.item.name,
                move: machine.move.name,
                version: machine.version_group.name
              });
            }
          });
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Generation II{pokedex && ': ' + capitalize(pokedex.region.name)}
        </h1>
        <PokePreview name={imgAlt} url={selected.sprites.front_default ?? ''} />
      </header>
      <article className="App-body">
        {pokedex ?
          <PokeList
            pokedex={pokedex}
            hoverHandler={(name)=>
              api.getPokemonByName(name).then(res => {
                setSelected(res);
                setImgAlt(name);
              }).catch(e => {console.error("ERROR getting pokemon by name:",e)})
            }
            api={api}
            machines={machines_list}
          />
        :
          <span>Loading...</span>
        }
      </article>
    </div>
  );
}

export default App;
