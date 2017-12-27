class Api::V1::CharactersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    character = Character.new(char_params)
    character.author = current_author
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
      :board_id
    )
  end
end
