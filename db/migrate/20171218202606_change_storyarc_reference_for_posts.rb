class ChangeStoryarcReferenceForPosts < ActiveRecord::Migration[5.1]
  def up
    remove_reference :posts, :storyarc
    add_reference :posts, :story_arc
  end

  def down
    remove_reference :posts, :story_arc
    add_reference :posts, :storyarc
  end
end
