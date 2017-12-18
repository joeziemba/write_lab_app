require 'rails_helper'

RSpec.describe StoryArc, type: :model do
  after(:each) do
    Author.destroy_all
  end

  it 'should allow a title' do
    storyarc = StoryArc.new(title: 'Making it Happen')
    expect(storyarc).to have_attributes(title: 'Making it Happen')
  end

  it 'should not be valid if no title, board and character' do
    storyarc = StoryArc.new
    expect(storyarc.valid?).to be false
    expect(storyarc.errors).to be_truthy
  end

  it 'should be valid with title, board and character' do
    author = create(:author)

    board = Board.new(name: 'New Hogwarts')
    board.author = author

    character = Character.new(name: 'Harry Potter')
    character.board = board
    character.author = author

    storyarc = StoryArc.new(title: 'Making it Happen')
    storyarc.board = board
    storyarc.character = character

    expect(storyarc.valid?).to be true
    expect(storyarc.errors).to be_truthy
  end
end
