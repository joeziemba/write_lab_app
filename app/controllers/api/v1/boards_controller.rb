class Api::V1::BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
    @user = current_author
    if current_author && @user.characters.length > 0
      @username = @user.username
      @characters = @user.characters.select { |c| c.board_id == @board.id }
    elsif current_author
      @username = @user.username
      @characters = [{ id: 0, name: '' }]
    else
      @username = ''
      @characters = [{ id: 0, name: '' }]
    end
    render json: {
      boardData: @board,
      currentAuthor: @username,
      characters: @characters
    }
  end
end
