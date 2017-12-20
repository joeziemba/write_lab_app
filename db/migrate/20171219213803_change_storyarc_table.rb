class ChangeStoryarcTable < ActiveRecord::Migration[5.1]
  def change
    rename_table :story_arcs, :arcs
    remove_reference :posts, :story_arc
    add_reference :posts, :arc
  end
end
