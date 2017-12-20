require 'rails_helper'

describe Api::V1::ArcsController, type: :controller do
  let!(:testBoard) { create(:board) }
  let!(:testChar) { Character.new(name: 'Nick Nile', author: testBoard.author, board: testBoard) }
  let!(:arc1) { create(:arc, title: 'Something Wicked', character: testChar, board: testBoard) }
  let!(:arc2) { create(:arc, title: 'Charms to Meet You', character: testChar, board: testBoard) }

  it 'should return a json response' do
    get :index, params: { board_id: testBoard.id }

    expect(response.status).to eq(200)
    expect(response.header['Content-Type']).to include 'application/json'
  end

  it 'should return all Arcs for the specified Board' do
    get :index, params: { board_id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data.length).to be 2
    expect(data[0]['title']).to eq('Charms to Meet You')
    expect(data[1]['title']).to eq('Something Wicked')
  end

  it 'should return the name of the Character who created the Arc' do
    get :index, params: { board_id: testBoard.id }
    data = JSON.parse(response.body)

    expect(data.length).to be 2
    expect(data[0]['character']['name']).to eq('Nick Nile')
    expect(data[1]['character']['name']).to eq('Nick Nile')
  end
end
