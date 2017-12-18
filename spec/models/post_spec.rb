require 'rails_helper'

RSpec.describe Post, type: :model do
  it 'should initiate with attributes' do
    post = Post.new()

    expect(post).to have_attributes(content: nil)
    expect(post).to have_attributes(character_id: nil)
    expect(post).to have_attributes(storyarc_id: nil)
  end

  it 'should be invalid without a name, storyarc and character' do
    post = Post.new()

    expect(post.valid?).to be false
    expect(post.errors.full_messages).to include("Content can't be blank")
    expect(post.errors.full_messages).to include("Storyarc must exist")
    expect(post.errors.full_messages).to include("Character must exist")
  end

  it 'should be valid with a name, storyarc and character' do
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
    post.storyarc = storyarc

    expect(post).to have_attributes(content: 'Stumbled outta bed and tumbled in the kitchen to pour myself a cup of ambition')
    expect(post).to have_attributes(character_id: character.id)
    expect(post).to have_attributes(storyarc_id: storyarc.id)

    expect(post.valid?).to be true
  end

  it 'should allow backstory, age, avatar_url' do
    author = create(:author)
    board = Board.new(name: "Test Board")
    board.author = author

    post = Post.new(
      name: 'Harry Potter',
      backstory: "Voldemort killed his parents and now he's FAMOUS",
      age: '14'
    )
    post.author = author
    post.board = board

    expect(post).to have_attributes(name: "Harry Potter")
    expect(post).to have_attributes(
      backstory: "Voldemort killed his parents and now he's FAMOUS"
    )
    expect(post).to have_attributes(age: '14')

    expect(post.valid?).to be true
  end







  it 'should require post content' do
    post = Post.new(content: 'Stumbled outta bed and tumbled in the kitchen to pour myself a cup of ambition')

    expect(post).to have_attributes(content:'Stumbled outta bed and tumbled in the kitchen to pour myself a cup of ambition')
  end
end
