class Api::V1::BoardsController < ApplicationController
  def show
    board = Board.find(params[:id])
    render json: board
  end
end
