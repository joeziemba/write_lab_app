class AddBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.string      :name,        null: false
      t.text        :description, null: false, default: ""
      t.references  :author,      null: false

      t.timestamps
    end
  end
end
