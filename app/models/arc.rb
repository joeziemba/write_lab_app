class Arc < ApplicationRecord
  # SCHEMA
  # t.string      :title,     null: false
  # t.references  :character, null: false
  # t.references  :board,     null: false
  # t.timestamps

  # ASSOCIATIONS
  has_many :posts
  has_many :taggings
  has_many :tags, through: :taggings

  belongs_to :character
  belongs_to :board

  # VALIDATIONS
  validates_presence_of :title

  # METHODS
  def all_tags=(names)
    self.tags = names.split(",").map do |name|
        Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end

  def self.tagged_with(name)
    Tag.find_by_name!(name).arcs
  end

end
