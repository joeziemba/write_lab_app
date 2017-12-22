require 'rails_helper'

describe Api::V1::BoardsController, type: :controller do
  let!(:testBoard) { create(:board) }

  it 'should return a json response' do
    get :show, params: { id: testBoard.id }

    expect(response.status).to eq(200)
    expect(response.header['Content-Type']).to include 'application/json'
  end

  it 'should include the board name and description' do
    get :show, params: { id: testBoard.id }

    data = JSON.parse(response.body)
    expect(data['boardData']['name']).to eq('New Hogwarts')
    expect(data['boardData']['description']).to eq("The Battle of Hogwarts and The Dark Lord Voldemort are now more legend than history. The magical world moved on to great prosperity in the wake of those events, but peace never last. Murmurs of a new dark force are beginning to ripple through Britain's wizarding community. And Hogwarts once again seems to be at risk.")
  end
end
