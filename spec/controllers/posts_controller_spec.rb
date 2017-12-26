require 'rails_helper'

describe PostsController, type: :controller do
  describe 'GET#new' do
    let!(:testBoard) { create(:board) }
    let!(:testChar) { Character.create(name: 'Nick Nile', author: testBoard.author, board: testBoard) }
    let!(:arc1) { create(:arc, title: 'Something Wicked', character: testChar, board: testBoard) }

    subject { get :new, params: { board_id: testBoard.id, arc_id: arc1.id } }

    it 'should render boards/index template' do
      expect(subject).to render_template('boards/index')
    end
  end
end
