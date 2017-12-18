class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string  :name,    null: false
      t.text    :backstory
      t.string  :age
      t.string  :avatar_url
      t.references :author
      t.references :board

      t.timestamps
    end
  end
end
