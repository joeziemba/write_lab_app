import React from 'react';
import { Link } from 'react-router';

const CharacterMenu = (props) => {
  let charOptions = props.characters.filter( c => c.id != props.currentCharacterId );
  let options = charOptions.map( character => {
    return (
      <option key={character.id} value={character.id}>{character.name}</option>
    )
  })
  return(
    <div className='grid-x'>
      <div className='cell large-12' id='character-menu'>
        <div className='grid-x'>
          <div className='cell large-6 medium-6'>
            <h4>Character: {props.currentCharacterName}</h4>
          </div>
          <div className='cell large-3 medium-3'>
            <form name='CharacterChangeForm'>
              <select name='characters' onChange={props.changeCharacter}>
                <option value={props.currentCharacterId}>{props.currentCharacterName}</option>
                {options}
              </select>
            </form>
          </div>
          <div className='cell large-3 medium-3'>
            <Link to={`/boards/${props.boardId}/characters/new`}>Create Character</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterMenu;
