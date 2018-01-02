import React from 'react';
import { Link } from 'react-router';

const CharacterMenu = (props) => {
  let charOptions = props.characters.filter( c => c.id != props.currentCharacterId );

  let options = charOptions.map( character => {
    return (
      <option key={character.id} value={character.id}>{character.name}</option>
    )
  })

  let background = {
    backgroundImage: "url(" + props.currentCharacterImage + ")",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  }

  let display

  if(options.length <= 0) { display = { display: 'none' } }

  return(
    <div className='grid-x'>
      <div className='cell large-12' id='character-menu'>
        <div className='grid-x'>
          <div className='cell large-8 medium-12 char-menu-padding'>
            <div id='character-image' style={ background } />
            <h4>{props.currentCharacterName}</h4>
            <Link to={`/boards/${props.boardId}/characters/${props.currentCharacterId}/edit`} className='util-button'>
              <i className="fa fa-pencil"></i>&nbsp; Edit
            </Link>
            <Link href={`/boards/${props.boardId}/characters/new`} className='util-button'>
              <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; New Character
            </Link>
          </div>
          <div className='cell large-4 medium-12 small-12'>
            <form name='CharacterChangeForm' style={display}>
              <select name='characters' onChange={props.changeCharacter} className='top-margin-10'>
                <option value='0'>Change Character</option>
                {options}
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterMenu;
