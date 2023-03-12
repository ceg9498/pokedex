export default function checkGame(name, target) {
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