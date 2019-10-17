class CreateFreeDates < ActiveRecord::Migration[6.0]
  def change
    create_table :free_dates do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date

      t.timestamps
    end
  end
end
