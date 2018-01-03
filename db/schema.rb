# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180103162139) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "arcs", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "character_id", null: false
    t.bigint "board_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_arcs_on_board_id"
    t.index ["character_id"], name: "index_arcs_on_character_id"
  end

  create_table "authors", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.text "bio", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_authors_on_email", unique: true
    t.index ["reset_password_token"], name: "index_authors_on_reset_password_token", unique: true
  end

  create_table "boards", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", default: "", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image", default: "", null: false
    t.index ["author_id"], name: "index_boards_on_author_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name", null: false
    t.text "backstory", default: "", null: false
    t.string "age", default: "", null: false
    t.string "avatar_url", default: "", null: false
    t.bigint "author_id"
    t.bigint "board_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_characters_on_author_id"
    t.index ["board_id"], name: "index_characters_on_board_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text "content", null: false
    t.bigint "character_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "arc_id"
    t.index ["arc_id"], name: "index_posts_on_arc_id"
    t.index ["character_id"], name: "index_posts_on_character_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.bigint "arc_id"
    t.bigint "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["arc_id"], name: "index_taggings_on_arc_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name"
  end

end
