require 'rails_helper'

describe Api::V1::AuthorsController, type: :controller do
  describe 'GET#current' do
    it 'should return a json response' do
      get :current

      expect(response.status).to eq(200)
      expect(response.header['Content-Type']).to include 'application/json'
    end

    it 'should return the current users data when logged in' do
      user = create(:author)
      sign_in(user)
      get :current
      body = JSON.parse(response.body)

      expect(body['id']).to eq(user.id)
    end

    it 'should return null/nil when not logged in' do
      get :current
      body = JSON.parse(response.body)

      expect(body).to eq(nil)
    end
  end
end
