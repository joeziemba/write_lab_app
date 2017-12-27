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
          <div className='cell large-6 medium-12 char-menu-padding'>
            <h4>Character: {props.currentCharacterName}</h4>
          </div>
          <div className='cell large-4 medium-10 small-10'>
            <form name='CharacterChangeForm'>
              <select name='characters' onChange={props.changeCharacter}>
                <option value='0'>Change Character</option>
                {options}
              </select>
            </form>
          </div>
          <div className='large-1 medium-1 small-1 char-menu-padding right'>
            <i className="fas fa-edit"></i>
          </div>
          <div className='cell large-1 medium-1 small-1 char-menu-padding right'>
            <Link to={`/boards/${props.boardId}/characters/new`}><i className="fas fa-plus"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterMenu;
