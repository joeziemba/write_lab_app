Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :authors

  # API ENDPOINT ROUTES
  namespace :api do
    namespace :v1 do
      resources :boards, only: [:index, :show, :create, :update] do
        resources :arcs, only: [:index]
      end
      resources :arcs, only: [:show, :create]
      resources :posts, only: [:create, :show, :update, :destroy]
      resources :characters, only: [:show, :create, :update]
      resources :authors, only: [] do
        collection do
          get 'current'
        end
      end
    end
  end
  get '/api/v1/boards/:board_id/arcs/:tag', to: 'api/v1/arcs#index'

  # APPLICATION ROUTES
  root 'application#home'

  resources :boards, only: [:index, :show, :new, :edit] do
    resources :arcs, only: [:show, :new] do
      resources :posts, only: [:new, :edit]
    end
    resources :characters, only: [:new, :edit]
  end
end
