class Board < ApplicationRecord
  # SCHEMA:
  # t.string      :name,        null: false
  # t.string      :description, null: false, default: ""
  # t.references  :author,      null: false
  # t.timestamps

  # ASSOCIATIONS
  has_many :characters
  has_many :arcs
  belongs_to :author

  # VALIDATIONS
  validates :name,
            presence: true
end
