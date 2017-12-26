require 'rails_helper'

describe Api::V1::PostsController, type: :controller do
  describe 'POST#create' do
    let!(:testBoard) { create(:board) }
    let!(:testChar) { Character.create(name: 'Nick Nile', author: testBoard.author, board: testBoard) }
    let!(:arc1) { create(:arc, title: 'Something Wicked', character: testChar, board: testBoard) }

    subject { post :create, params: { text: 'Test Post', post: { arc_id: arc1.id, character_id: testChar.id } } }

    it 'should return a json response' do
      expect(subject.status).to eq(200)
      expect(subject.header['Content-Type']).to include 'application/json'
    end

    it 'should return the json of a new Post' do
      body = JSON.parse(subject.body)
      
      expect(body['character_id']).to eq(testChar.id)
      expect(body['content']).to eq('Test Post')
    end

    it 'should return the json with errors if unseccessful' do
      post :create, params: { text: '', post: { arc_id: 0, character_id: 0 } }
      body = JSON.parse(response.body)

      expect(body['errors']).to include('Character must exist')
      expect(body['errors']).to include('Arc must exist')
      expect(body['errors']).to include("Content can't be blank")
    end
  end

end
