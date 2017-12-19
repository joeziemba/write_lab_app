require 'rails_helper'

RSpec.describe Post, type: :model do
  it 'should initiate with attributes' do
    post = Post.new

    expect(post).to have_attributes(content: nil)
    expect(post).to have_attributes(character_id: nil)
    expect(post).to have_attributes(arc_id: nil)
  end

  it 'should be invalid without content, storyarc and character' do
    post = Post.new

    expect(post.valid?).to be false
    expect(post.errors.full_messages).to include("Content can't be blank")
    expect(post.errors.full_messages).to include("Story arc must exist")
    expect(post.errors.full_messages).to include("Character must exist")
  end

  it 'should be valid with a content, storyarc and character' do
    author = create(:author)
    board = Board.new(name: "Test Board")
    board.author = author

    character = Character.new(name: 'Harry Potter')
    character.author = author
    character.board = board

    storyarc = StoryArc.new(title: 'Making it Happen')
    storyarc.character = character
    storyarc.board = board

    post = Post.new(
      content: 'Stumbled outta bed and tumbled in the kitchen to pour myself a cup of ambition'
    )
    post.character = character
    post.arc = storyarc

    expect(post).to have_attributes(content: 'Stumbled outta bed and tumbled in the kitchen to pour myself a cup of ambition')
    expect(post).to have_attributes(character_id: character.id)
    expect(post).to have_attributes(arc_id: storyarc.id)

    expect(post.valid?).to be true
  end
end
