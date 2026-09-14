import { assets, characters } from '../data/storyData';
export default function CharacterPortrait({ id, className = '', float = true }) {
  const character = characters.find(c => c.id === id);
  return <div className={`portrait ${float ? 'float' : ''} ${className}`} role="img" aria-label={`${character.name} character portrait`}><div className="portrait-art" style={{ backgroundImage: `url(${assets.charactersArt})`, backgroundPosition: `${character.index * 50}% top` }}/></div>;
}
