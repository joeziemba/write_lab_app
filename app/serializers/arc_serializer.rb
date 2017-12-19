class ArcSerializer < ActiveModel::Serializer
  attributes  :id,
              :title,
              :character

  has_many :posts
  belongs_to :board
  belongs_to :character

  class CharacterSerializer < ActiveModel::Serializer
    attributes :name
  end
end
