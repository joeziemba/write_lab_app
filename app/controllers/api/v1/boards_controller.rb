class Api::V1::BoardsController < ApplicationController
  def show
    venue = Venue.find(params[:id])
    render json: venue
  end
end
