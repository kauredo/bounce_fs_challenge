class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.string :name
      t.string :email
      t.string :card_number
      t.integer :number_of_bags

      t.timestamps
    end
  end
end
