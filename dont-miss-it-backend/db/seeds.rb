# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#User.destroy_all
Favourite.destroy_all
FreeDate.destroy_all

user = User.create([{username: 'Chris'}, {username: 'Sohaib'}])
favourites = Favourite.create([{user_id: 3, name: 'Chelsea FC' }, {user_id: 4, name: 'The Rolling Stones'}])
dates = FreeDate.create([{user_id: 4, date: '2020-06-17'}, {user_id: 3, date: '2019-11-16'}])