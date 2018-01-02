class Api::V1::AuthorsController < ApplicationController
  def current
    render json: current_author
  end
end
