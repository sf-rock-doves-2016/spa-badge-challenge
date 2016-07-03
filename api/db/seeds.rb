require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Teacher.create(name: "Derek")
Teacher.create(name: "Hunter")
Teacher.create(name: "Jaclyn")
Teacher.create(name: "Julian")
Teacher.create(name: "Mihai")
Teacher.create(name: "Sarah")
Teacher.create(name: "Seba")
Teacher.create(name: "Shambhavi")
Teacher.create(name: "Walker")

50.times do
  Badge.create(title: "Most likely to " + Faker::Team.name, teacher_id: rand(1..9))
end
