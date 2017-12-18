class Author < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Associations
  # has_many :boards
  # has_many :characters
  # has_many :posts, through :characters
  # has_many :threads, through :characters

  # Validations
  validates_presence_of :username, :email, :password
end
