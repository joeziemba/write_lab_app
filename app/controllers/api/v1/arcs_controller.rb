class Api::V1::ArcsController < ApplicationController
  def index
    @arcs = Board.find(params[:board_id]).arcs.reverse
    render json: @arcs
  end
end
