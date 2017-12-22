require 'rails_helper'

describe Api::V1::BoardsController, type: :controller do
  let!(:testBoard) { create(:board) }
  let!(:testBoard2) { create(:board, name:'Other Board', author: testBoard.author) }

  let!(:testChar) { Character.create(name: 'Nick Nile', author: testBoard.author, board: testBoard) }
  let!(:testChar2) { Character.create(name: 'Tony Stark', author: testBoard.author, board: testBoard) }
  let!(:testChar3) { Character.create(name: 'Archibald Rambo', author: testBoard.author, board: testBoard2) }

  it 'should return a json response' do
    get :show, params: { id: testBoard.id }

    expect(response.status).to eq(200)
    expect(response.header['Content-Type']).to include 'application/json'
  end

  it 'should include the board name and description in boardData' do
    get :show, params: { id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data['boardData']['name']).to eq('New Hogwarts')
    expect(data['boardData']['description']).to eq("The Battle of Hogwarts and The Dark Lord Voldemort are now more legend than history. The magical world moved on to great prosperity in the wake of those events, but peace never last. Murmurs of a new dark force are beginning to ripple through Britain's wizarding community. And Hogwarts once again seems to be at risk.")
  end

  it 'should return blank currentAuthor when no user is logged in' do
    get :show, params: { id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data['currentAuthor']).to eq('')
  end

  it 'should return an array with one blank character when no user is logged in' do
    get :show, params: { id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data['characters'].class).to eq(Array)
    expect(data['characters'][0]['id']).to eq(0)
    expect(data['characters'][0]['name']).to eq('')
  end

  it "should return the user's username as currentAuthor when logged in" do
    author = testBoard.author
    sign_in(author)
    get :show, params: { id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data['currentAuthor']).to eq('joeziemba')
  end

  it 'should return an array of the users characters for the specified board' do
    author = testBoard.author
    sign_in(author)
    get :show, params: { id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data['characters'].class).to eq(Array)
    expect(data['characters'].length).to eq(2)

    expect(data['characters'][0]['name']).to eq('Nick Nile')
    expect(data['characters'][1]['name']).to eq('Tony Stark')
  end

  it 'should return an array with empty characters if user has no characters for that board' do
    author = Author.create(username: 'justmyrealname', email:'test@test.com', password: 'password')
    sign_in(author)
    get :show, params: { id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data['characters'].class).to eq(Array)
    expect(data['characters'].length).to eq(1)

    expect(data['characters'][0]['name']).to eq('')
  end
end
