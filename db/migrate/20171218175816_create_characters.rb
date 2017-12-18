class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string  :name,        null: false
      t.text    :backstory,   null: false, default: ""
      t.string  :age,         null: false, default: ""
      t.string  :avatar_url,  null: false, default: ""
      t.references :author
      t.references :board

      t.timestamps
    end
  end
end
