import './Type.css';

export default function Type(props) {
  const { name } = props;
  return (
    <span className={`type ${name}`}>{name.toUpperCase()}</span>
  )
}