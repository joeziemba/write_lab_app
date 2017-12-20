require 'rails_helper'

RSpec.describe Arc, type: :model do
  after(:each) do
    Author.destroy_all
  end

  it 'should allow a title' do
    arc = Arc.new(title: 'Making it Happen')
    expect(arc).to have_attributes(title: 'Making it Happen')
  end

  it 'should not be valid if no title, board and character' do
    arc = Arc.new
    expect(arc.valid?).to be false
    expect(arc.errors).to be_truthy
  end

  it 'should be valid with title, board and character' do
    author = create(:author)

    board = Board.new(name: 'New Hogwarts')
    board.author = author

    character = Character.new(name: 'Harry Potter')
    character.board = board
    character.author = author

    arc = Arc.new(title: 'Making it Happen')
    arc.board = board
    arc.character = character

    expect(arc.valid?).to be true
    expect(arc.errors).to be_truthy
  end
end
