require 'rails_helper'

RSpec.describe Author, type: :model do
  it 'should initiate with a username, email, first_name, last_name, and bio' do
    author = Author.new

    expect(author).to have_attributes(first_name: "")
    expect(author).to have_attributes(last_name: "")
    expect(author).to have_attributes(username: "")
    expect(author).to have_attributes(email: "")
    expect(author).to have_attributes(bio: "")
  end
end
