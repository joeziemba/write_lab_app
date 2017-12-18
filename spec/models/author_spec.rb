require 'rails_helper'

RSpec.describe Author, type: :model do
  it 'should initiate with a username, email, first_name, last_name, and bio' do
    author = Author.new

    expect(author).to have_attributes(first_name: "")
    expect(author).to have_attributes(last_name: "")
    expect(author).to have_attributes(username: "")
    expect(author).to have_attributes(email: "")
    expect(author).to have_attributes(bio: "")

    expect(author.valid?).to be false
  end

  it 'should be invalid without an email, username and password' do
    author = Author.new(
      username:'',
      email: '',
      password: '',
      password_confirmation: ''
    )

    expect(author.valid?).to be false
    expect(author.errors.full_messages).to include("Email can't be blank")
    expect(author.errors.full_messages).to include("Password can't be blank")
    expect(author.errors.full_messages).to include("Username can't be blank")
  end

  it 'should be valid with only an email, username and password' do
    author = Author.new(
      username:'joeziemba',
      email: 'joe@joeziemba.com',
      password: 'password',
      password_confirmation: 'password'
    )

    expect(author.valid?).to be true
  end

  it 'should allow first, last and bio' do
    author = Author.new(
      username:'joeziemba',
      email: 'joe@joeziemba.com',
      password: 'password',
      password_confirmation: 'password',
      bio: "I'm a little tea pot",
      first_name: 'Joe',
      last_name: 'Ziemba'
    )
    expect(author.valid?).to be true
  end
end
