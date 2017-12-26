class Api::V1::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    new_post = Post.new(post_params)
    new_post.content = params['text']
    if new_post.save
      render json: new_post
    else
      render json: { errors: new_post.errors.full_messages }, status: :unprocessable_entity
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
