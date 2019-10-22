class AddTmIdToFavourites < ActiveRecord::Migration[6.0]
  def change
    add_column :favourites, :tm_id, :string
  end
end
