class Api::V1::CharactersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    character = Character.find(params[:id])
    render json: character
  end

  def create
    character = Character.new(char_params)
    character.author = current_author
    if character.save
      render json: character
    else
      render json: { errors: character.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    character = Character.update(params[:id], char_params)
    binding.pry
    if character.save
      render json: character
    else
      render json: { errors: character.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def char_params
    params.require(:character).permit(
      :name,
      :board_id,
      :age,
      :backstory,
      :avatar_url
    )
  end
end
