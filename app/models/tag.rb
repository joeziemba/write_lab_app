class Tag < ApplicationRecord
  # SCHEMA
  # t.string :name, null: false, index: true, unique: true
  # t.timestamps

  # ASSOCIATIONS
  has_many :taggings
  has_many :arcs, through: :taggings

  # VALIDATIONS
  validates :name, presence: true, uniqueness: true
end
