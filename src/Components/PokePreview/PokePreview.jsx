import './PokePreview.css';

export default function PokePreview(props) {
  const {name, url} = props;
  
  return(
    <div className="poke-preview">
      {url && <img src={url} alt={`Sprite of ${name}`} />}
    </div>
  );
}