class Arc < ApplicationRecord
  # SCHEMA
  # t.string      :title,     null: false
  # t.references  :character, null: false
  # t.references  :board,     null: false
  # t.timestamps

  # ASSOCIATIONS
  has_many :posts
  belongs_to :character
  belongs_to :board

  # VALIDATIONS
  validates_presence_of :title
end
