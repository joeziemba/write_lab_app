import React from 'react';

const CharacterMenu = (props) => {
  let charOptions = props.characters.filter( c => c.id != props.currentCharacterId );
  let options = charOptions.map( character => {
    return (
      <option key={character.id} value={character.id}>{character.name}</option>
    )
  })
  return(
    <div className='cell large-12' id='character-menu'>
      <div className='gird-x'>
        <div className='cell large-3 medium-3'>
          <h4>Character Menu</h4>
        </div>
        <div className='cell large-9 medium-9'>
          <form name='CharacterChangeForm'>
            <select name='characters' onChange={props.changeCharacter}>
              <option value={props.currentCharacterId}>{props.currentCharacterName}</option>
              {options}
            </select>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CharacterMenu;
