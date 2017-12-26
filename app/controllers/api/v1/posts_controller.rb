class Api::V1::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    newPost = Post.new(post_params)
    newPost.content = params['text']
    if newPost.save
      render json: newPost
    else
      render json: { errors: newPost.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(
      :character_id,
      :text,
      :arc_id
    )
  end
end
