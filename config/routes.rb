Rails.application.routes.draw do
  resources :users, only: %i[index show]

  devise_for :users,
  path: '',
  path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
  },
  controllers: {
      sessions: 'sessions',
      registrations: 'registrations'
  }
  # get "vue/index"
  root to: "vue#index"
  match "*path", to: "vue#index", format: false, via: :get
end
