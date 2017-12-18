require 'rails_helper'

describe BoardsController, type: :controller do
  it 'should have an index method' do
    get :index
    assert_response :success
  end

  it 'should have an show method that renders the index template' do
    get :show, params: { id: 1 }
    assert_response :success
    render_template :index
  end
end
