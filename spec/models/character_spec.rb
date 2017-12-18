require 'rails_helper'

RSpec.describe Character, type: :model do
  it 'should initiate with attributes' do
    character = Character.new()

    expect(character).to have_attributes(name: nil)
    expect(character).to have_attributes(backstory: "")
    expect(character).to have_attributes(age: "")
    expect(character).to have_attributes(avatar_url: "")
    expect(character).to have_attributes(author_id: nil)
    expect(character).to have_attributes(board_id: nil)
  end

  it 'should be invalid without a name, board and author' do
    character = Character.new()

    expect(character.valid?).to be false
    expect(character.errors.full_messages).to include("Name can't be blank")
    expect(character.errors.full_messages).to include("Board must exist")
    expect(character.errors.full_messages).to include("Author must exist")
  end

  it 'should be valid with a name, author and board' do
    author = create(:author)
    board = Board.new(name: "Test Board")
    board.author = author

    character = Character.new(name: 'Harry Potter')
    character.author = author
    character.board = board

    expect(character).to have_attributes(name: "Harry Potter")
    expect(character).to have_attributes(board_id: board.id)
    expect(character).to have_attributes(author_id: author.id)

    expect(character.valid?).to be true
  end

  it 'should allow backstory, age, avatar_url' do
    author = create(:author)
    board = Board.new(name: "Test Board")
    board.author = author

    character = Character.new(
      name: 'Harry Potter',
      backstory: "Voldemort killed his parents and now he's FAMOUS",
      age: '14'
    )
    character.author = author
    character.board = board

    expect(character).to have_attributes(name: "Harry Potter")
    expect(character).to have_attributes(
      backstory: "Voldemort killed his parents and now he's FAMOUS"
    )
    expect(character).to have_attributes(age: '14')

    expect(character.valid?).to be true
  end
end
