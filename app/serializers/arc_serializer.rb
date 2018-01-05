class ArcSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :last_post_date

  has_many :tags
  belongs_to :character
  has_many :posts

  class PostSerializer < ActiveModel::Serializer
    attributes :id, :content, :created_at, :character
  end

  class CharacterSerializer < ActiveModel::Serializer
    attributes :name
  end

  def last_post_date
    object.posts.last.created_at
  end
end
