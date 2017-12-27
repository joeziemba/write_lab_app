require 'rails_helper'

describe CharactersController, type: :controller do
  describe 'GET#new' do
    subject { get :new, params: { board_id: 1 } }

    it 'should render the boards/index layout' do
      expect(subject).to render_template('boards/index')
    end
  end
end
