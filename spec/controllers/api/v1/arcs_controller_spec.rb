require 'rails_helper'

describe Api::V1::ArcsController, type: :controller do
  let!(:testBoard) { create(:board) }
  let!(:testChar) { Character.create(name: 'Nick Nile', author: testBoard.author, board: testBoard) }
  let!(:testChar2) { Character.create(name: 'Tony Stark', author: testBoard.author, board: testBoard) }
  let!(:arc1) { create(:arc, title: 'Something Wicked', character: testChar, board: testBoard) }
  let!(:arc2) { create(:arc, title: 'Charms to Meet You', character: testChar, board: testBoard) }

  let!(:post1) { Post.create(content: 'The first post!', arc: arc1, character: testChar) }
  let!(:post2) { Post.create(content: 'The second post!', arc: arc1, character: testChar2) }

  describe 'GET#index' do
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

  describe 'GET#show' do
    it 'should return a json response with just an Arc id' do
      get :show, params: { id: arc1.id }

      expect(response.status).to eq(200)
      expect(response.header['Content-Type']).to include 'application/json'
    end

    it 'should return the name and creator of the specified Arc' do
      get :show, params: { id: arc1.id }
      data = JSON.parse(response.body)

      expect(data['title']).to eq('Something Wicked')
      expect(data['character'].class).to eq(Hash)
      expect(data['character']['name']).to eq('Nick Nile')
    end

    it 'should return an array of Posts for the specified Arc' do
      get :show, params: { id: arc1.id }
      data = JSON.parse(response.body)

      expect(data['posts'].class).to be Array
      expect(data['posts'].length).to eq 2
    end
  end
end
