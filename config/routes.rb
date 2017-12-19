Rails.application.routes.draw do
  devise_for :authors
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#home'

  resources :boards, only: [:index, :show]

end
