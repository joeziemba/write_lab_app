class ArcSerializer < ActiveModel::Serializer
  attributes  :id,
              :title,
              :created_at

  has_many :posts
  belongs_to :character

  class CharacterSerializer < ActiveModel::Serializer
    attributes :name
  end
end
