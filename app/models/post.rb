class Post < ApplicationRecord
  # SCHEMA
  # t.text        :content,   null: false
  # t.refernces   :character, null: false
  # t.references  :storyarc,  null: false
  # t.timestamps

  # ASSOCIATIONS
  belongs_to :character
  belongs_to :arc

  # VALIDATIONS
  validates :content,
            presence: true
end
