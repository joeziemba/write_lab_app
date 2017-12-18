require 'rails_helper'

RSpec.describe Board, type: :model do
  it 'should initiate with a name, description and author_id' do
    board = Board.new()

    expect(board).to have_attributes(name: nil)
    expect(board).to have_attributes(description: '')
    expect(board).to have_attributes(author_id: nil)
  end

  it 'should be valid with a name and author' do
    author = create(:author)
    board = Board.new(name: "Test Board")
    board.author = author

    expect(board).to have_attributes(name: "Test Board")
    expect(board.valid?).to be true
  end

  it 'should be invalid without a name and author' do
    board = Board.new()

    expect(board.valid?).to be false
    expect(board.errors.full_messages).to include("Name can't be blank")
    expect(board.errors.full_messages).to include("Author must exist")
  end

  it 'should allow a description' do
    author = create(:author)
    board = Board.new(name: "Test Board")
    board.author = author

    expect(board).to have_attributes(name: "Test Board")
    expect(board.valid?).to be true
  end
end
