class CreateStoryArcs < ActiveRecord::Migration[5.1]
  def change
    create_table :story_arcs do |t|
      t.string      :title,     null: false
      t.references  :character, null: false
      t.references  :board,     null: false
      t.timestamps
    end
  end
end
