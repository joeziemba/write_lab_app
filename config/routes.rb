Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :authors

  # API ENDPOINT ROUTES
  namespace :api do
    namespace :v1 do
      resources :boards, only: [:show] do
        resources :arcs, only: [:index]
      end
      resources :arcs, only: [:show]
      resources :posts, only: [:create]
      resources :characters, only: [:create]
    end
  end

  # APPLICATION ROUTES
  root 'application#home'

  resources :boards, only: [:index, :show] do
    resources :arcs, only: [:show] do
      resources :posts, only: [:new]
    end
    resources :characters, only: [:new]
  end


end
