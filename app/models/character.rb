class Character < ApplicationRecord
  # SCHEMA
  # t.string  :name,    null: false
  # t.text    :backstory
  # t.string  :age
  # t.string  :avatar_url
  # t.timestamps

  # ASSOCIATIONS
  belongs_to :author
  belongs_to :board
  has_many :storyarcs
  has_many :posts

  # VALIDATIONS
  validates :name, presence: true
end
