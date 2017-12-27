class Api::V1::ArcsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @arcs = Board.find(params[:board_id]).arcs.reverse
    render json: @arcs
  end

  def show
    @arc = Arc.find(params[:id])
    render json: @arc
  end

  def create
    arc = Arc.new(arc_params)
    post = Post.new(content: params['text'], character: arc.character, arc: arc)
    if arc.valid? && post.valid?
      arc.save
      post.save
      render json: { arc: arc, post: post }
    else
      render json: { errors: new_post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def arc_params
    params.require(:arc).permit(:title, :text, :board_id, :character_id)
  end
end
