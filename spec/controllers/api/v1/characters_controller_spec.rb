require 'rails_helper'

describe Api::V1::CharactersController, type: :controller do
  describe 'POST#create' do
    let!(:testBoard) { create(:board) }
    let!(:author) { create(:author, username: 'justmyrealname', email: 'just@myreal.name')}


    subject { post :create, params: { character: { name: 'Mace Windu', board_id: testBoard.id } } }

    it 'should return a json response' do
      sign_in(author)
      expect(subject.status).to eq(200)
      expect(subject.header['Content-Type']).to include 'application/json'
    end

    it 'should return the json of a new Post' do
      sign_in(author)
      body = JSON.parse(subject.body)

      expect(body['author_id']).to eq(author.id)
      expect(body['name']).to eq('Mace Windu')
    end

    it 'should return the json with errors if unseccessful' do
      post :create, params: { character: { name: '', board_id: '' } }
      body = JSON.parse(response.body)

      expect(body['errors']).to include('Author must exist')
      expect(body['errors']).to include('Board must exist')
    end
  end
end
