class Api::V1::BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
    @user = current_author
    @characters = @user.characters.select { |c| c.board_id == @board.id }
    render json: {
      boardData: @board,
      currentAuthor: @user.username,
      characters: @characters
    }
  end
end
