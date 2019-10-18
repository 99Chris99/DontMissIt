class User < ApplicationRecord
    has_many :favourites
    has_many :free_dates
    # validates :username, presence: true
    validates :username, uniqueness: true

end
