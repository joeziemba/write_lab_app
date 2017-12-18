class DeviseCreateAuthors < ActiveRecord::Migration[5.1]
  def change
    create_table :authors do |t|
      ## DATABASE AUTHENTICATABLE
      t.string :username,           null: false, default: ""
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## RECOVERABLE
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## REMEMBERABLE
      t.datetime :remember_created_at

      ## TRACKABLE
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      ## CONFIRMABLE
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      ## LOCKABLE
      # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at

      ## EXTRA AUTHOR INFO:
      # The default: "" required to allow for editing of user info through
      # react API (can't use null/nil values).
      # These values MUST be listed under configure_permitted_parameters in
      # app/controllers/application_controller.rb
      t.string  :first_name,    null: false, default: ""
      t.string  :last_name,     null: false, default: ""
      t.text    :bio,           null: false, default: ""

      t.timestamps null: false
    end

    add_index :authors, :email,                unique: true
    add_index :authors, :reset_password_token, unique: true
    # add_index :authors, :confirmation_token,   unique: true
    # add_index :authors, :unlock_token,         unique: true
  end
end
