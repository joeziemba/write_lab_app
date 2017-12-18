class BoardsController < ApplicationController
  def index
    # Will display list of all boards on WriteLab. Searchable?
  end

  def show
    # Main controller of the app, should handle displaying the board and
    # all threads within it, most recent posts.
    # Should render components from react with API
    render :index
  end
end
