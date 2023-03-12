export default function capitalize(str) {
  let split = str.split('-');
  for (let i = 0; i < split.length; i++) {
    split[i] = split[i].substring(0,1).toUpperCase() + split[i].substring(1);
  }
  return split.join(' ');
}