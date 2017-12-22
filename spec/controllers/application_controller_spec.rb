require 'rails_helper'

describe ApplicationController, type: :controller do
  describe 'GET#home' do
    subject { get :home }

    it 'should render the static/home layout' do
      expect(subject).to render_template('static/home')
    end
  end
end
