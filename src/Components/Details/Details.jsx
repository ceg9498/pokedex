import "./Details.css";
import { Type } from "../index";
import { capitalize } from "../../Utilities";

const TARGET = 2;

export default function Details(props) {
  const { machines, mon } = props;
  const moves = processMoves(mon.moves, machines);
  return (
    <section className="details">
      <h3>Details</h3>
      <Type name={mon.types[0].type.name} />
      {mon.types[1] && <Type name={mon.types[1].type.name} />}
      <br/><br/>
      <table>
        <thead><tr><td>Move</td><td>Version(s)</td><td>Method</td></tr></thead>
        <tbody>
        {moves.map(move => {
          return (
            <tr key={move.name}>
              <td>{move.name}</td>
              <td>{move.games}</td>
              <td>{move.methods}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </section>
  );
}

function processMoves(moves, machines) {
  let processedMoves = [];
  moves.forEach(move => {
    let games = new Set();
    let methods = new Set();
    move.version_group_details.forEach(vg => {
      let str = checkGame(vg.version_group.name, TARGET);
      if (str !== null) {
        games.add(str);
        methods.add(handleMethod(vg, move.move.name, machines));
      }
    });
    games = Array.from(games).filter(entry => entry !== null);
    methods = Array.from(methods).filter(entry => entry !== null);
    if (games.length === 0 || methods.length === 0) return {};

    processedMoves.push({
      name: capitalize(move.move.name),
      games: games.join(''),
      methods: methods.join(', ')
    });
  });
  // sort processedMoves by learn type
  return sortMoves(processedMoves);
}

function sortMoves(moves) {
  let egg = [];
  let levelup = [];
  let machine = [];

  moves.forEach(move => {
    if (move.methods.includes('Egg')) {
      egg.push(move);
    } else if (move.methods.includes('Level Up')) {
      levelup.push(move);
    } else if (move.methods.includes('TM') || move.methods.includes('HM')) {
      machine.push(move);
    }
  });

  // sort levelup
  levelup.sort((a, b) => {
    return parseInt(a.methods.split(',')[0].replace(/\D/g, '')) - parseInt(b.methods.split(',')[0].replace(/\D/g, ''));
  });

  // sort machines: TM < HM, 0-9
  machine.sort((a, b) => {
    return parseInt(a.methods.split(',')[0].replace(/\D/g, '')) - parseInt(b.methods.split(',')[0].replace(/\D/g, ''));
  })


  return [...egg, ...levelup, ...machine];
}

function checkGame(name, target) {
  let game = null;
  switch (target) {
    case 1:
      switch (name) {
        case 'red-blue':
          game = 'RB';
          break;
        case 'yellow':
          game = 'Y';
          break;
        default: return game;
      }
      break;
    case 2:
      switch (name) {
        case 'gold-silver':
          game = 'GS';
          break;
        case 'crystal':
          game = 'C';
          break;
        default: return game;
      }
      break;
    case 3:
      switch (name) {
        case 'ruby-sapphire':
          game = 'RS';
          break;
        case 'emerald':
          game = 'E';
          break;
        default: return game;
      }
      break;
    default: return game;
  }
  return game;
}

function handleMethod(method, moveName, machines) {
  let methodText = '';
  switch (method.move_learn_method.name) {
    case 'level-up':
      methodText = `Level Up (${method.level_learned_at})`;
      break;
    case 'machine':
      machines.forEach(machine => {
        if (moveName === machine.move) {
          methodText = machine.id.toUpperCase();
          return methodText;
        }
      })
      break;
    case 'egg':
      methodText = 'Egg';
      break;
    case 'tutor':
      methodText = 'Tutor';
      break;
    default: return;
  }
  return methodText;
}