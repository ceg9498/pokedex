import { useState } from 'react';
import './App.css';
import Pokedex from 'pokedex-promise-v2';
import {
  Pokedex as PokeList,
  PokePreview
} from './Components';

const api = new Pokedex();
let pokedex = null;
if (!pokedex) {
  api.getPokedexByName(3).then(res => pokedex = res);
}
let machines_list = [];
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
          console.log(machines_list);
        }
      });
    });
  });
}

function App() {
  const [imgAlt, setImgAlt] = useState(null);
  const [selected, setSelected] = useState({sprites: {front_default: ''}});

  if (!pokedex) return (<span>Loading...</span>);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Generation II{pokedex && ': ' + capitalize(pokedex.region.name)}
        </h1>
        <PokePreview name={imgAlt} url={selected.sprites.front_default ?? ''} />
      </header>
      <article className="App-body">
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
      </article>
    </div>
  );
}

function capitalize(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1);
}

export default App;
