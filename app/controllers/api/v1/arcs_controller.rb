class Api::V1::ArcsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  def index
    if params[:tag]
      @arcs = Arc.tagged_with(params[:tag])
    else
      @arcs = Board.find(params[:board_id]).arcs.reverse
    end
    render json: @arcs
  end

  def show
    @arc = Arc.find(params[:id])
    render json: @arc
  end

  def create
    arc = Arc.new(arc_params)
    arc.all_tags=(params['tags'])
    post = Post.new(content: params['text'], character: arc.character, arc: arc)
    if arc.valid? && post.valid?
      arc.save
      post.save
      render json: { arc: arc, post: post }
    else
      render json: { errors: arc.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    arc = Arc.update(params[:id], arc_params)
    arc.all_tags=(params['tags'])
    if arc.save
      render json: arc
    else
      render json: { errors: arc.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def arc_params
    params.require(:arc).permit(:title, :text, :board_id, :character_id, :tags)
  end
end
