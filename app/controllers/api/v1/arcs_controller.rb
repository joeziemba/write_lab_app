class Api::V1::ArcsController < ApplicationController
  def index
    @arcs = Board.find(params[:board_id]).arcs
    render json: @arcs
  end
end
