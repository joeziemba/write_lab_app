class Tagging < ApplicationRecord
  # ASSOCIATIONS
  belongs_to :arc
  belongs_to :tag
end
