Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :authors
  # API ENDPOINT ROUTES
  namespace :api do
    namespace :v1 do
      resources :boards, only: [:show] do
        resources :arcs, only: [:index]
      end
    end
  end

  root 'application#home'

  resources :boards, only: [:index, :show] do
    resources :arcs, only: [:show]
  end


end
