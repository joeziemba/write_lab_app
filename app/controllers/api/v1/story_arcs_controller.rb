class Api::V1::StoryArcsController < ApplicationController
  def index
    arcs = Board.find(params[:board_id]).story_arcs
    render json: arcs
  end
end
