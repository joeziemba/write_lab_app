require 'rails_helper'

describe ArcsController, type: :controller do
  describe 'GET#show' do
    subject { get :show, params: { board_id: 1, id: 1 } }

    it 'should render the boards/index layout' do
      expect(subject).to render_template('boards/index')
    end
  end

  describe 'GET#new' do
    subject { get :new, params: { board_id: 1 } }

    it 'should render the boards/index layout' do
      expect(subject).to render_template('boards/index')
    end
  end
end
