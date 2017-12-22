class Api::V1::BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
    @username = ''
    @characters = [{ id: 0, name: '' }]

    if current_author
      @username = current_author.username
      unless current_author.characters.empty?
        @characters = @user.characters.select { |c| c.board_id == @board.id }
      end
    end

    render json: {
      boardData: @board,
      currentAuthor: @username,
      characters: @characters
    }
  end
end
