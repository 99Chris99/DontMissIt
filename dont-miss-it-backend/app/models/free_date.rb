class FreeDate < ApplicationRecord
  belongs_to :user



def self.dates_by_user (user)
  FreeDate.where(user_id: user)
end


end #class end