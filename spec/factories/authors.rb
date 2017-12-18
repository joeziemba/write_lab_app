FactoryBot.define do
  factory :author do
    username    'joeziemba'
    email       'test@test.com'
    first_name  'Joe'
    last_name   'Ziemba'
    password    'password'
    password_confirmation  "password"
  end
end
