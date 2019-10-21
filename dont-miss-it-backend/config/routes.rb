Rails.application.routes.draw do
  
  # get"/users/:username", to: "users#show"
  
  resources :free_dates
  resources :favourites
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
