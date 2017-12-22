class Api::V1::BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
    @user = current_author
    @username = ''
    @characters = [{ id: 0, name: '' }]

    if current_author
      @username = @user.username
      if !@user.characters.empty?
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
