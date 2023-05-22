# README Monolithic Rails + Vue

# Authentication
1. Add to Femfile
    - gem "devise"
2. bundle
3. rails generate devise:install
4. Add follow lines into config > environments > development.rb
    - config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
    - Rails.application.routes.default_url_options[:host] = 'localhost'
5. rails generate devise User
6. rails db:migrate
7. Add to Gemfile
    - gem 'devise-jwt'
8. bundle
9. Add to config/initializers/devise.rb
    - config.secret_key = '123Hej456World789123Hej456World789123Hej456World789'
    - config.jwt do |jwt|
        jwt.secret = '123Hej456World789123Hej456World789123Hej456World789'
        jwt.dispatch_requests = [
            ['POST', %r{^/login$}]
        ]
        jwt.revocation_requests = [
            ['DELETE', %r{^/logout$}]
        ]
        jwt.expiration_time = 1.day.to_i
    end
10. rails generate migration CreateJwtDenylist
11. CreateJwtDenyList migration update to
    - def change
        create_table :jwt_denylist do |t|
            t.string :jti, null: false
            t.datetime :expired_at, null: false
        end
        add_index :jwt_denylist, :jti
    end
12. rails db:migrate
13. touch app/models/jwt_denylist.rb
14. Add on app/models/jwt_denylist.rb
    - class JwtDenylist < ApplicationRecord
        include Devise::JWT::RevocationStrategies::Denylist

        self.table_name = 'jwt_denylist'
    end
15. Upload app/models/user.rb 
16. Add to Gemfile
    - gem 'rack-cors'
17. bundle
18. touch config/initializers/cors.rb
19. Add to config/initializers/cors.rb
    - Rails.application.config.middleware.insert_before 0, Rack::Cors do
        allow do
        origins '*'

        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head]
        end
    end
20. Add to config/routes.rb
    - devise_for :users,
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
21. touch app/controllers/registrations_controller.rb
22. Add to app/controllers/registrations_controller.rb
    - class RegistrationsController < Devise::RegistrationsController
        respond_to :json
        
        def create
            build_resource(sign_up_params)
            resource.save
            render_resource(resource)
        end

        private
        
        def sign_up_params
            params.require(:user).permit(:email, :password)
        end
    end
23. touch app/controllers/sessions_controller.rb
24. Add to app/controllers/sessions_controller.rb
    - class SessionsController < Devise::SessionsController
        respond_to :json
        
        private
        
        def respond_with(resource, _opts = {})
            render json: resource
        end
        
        def respond_to_on_destroy
            head :no_content
        end
    end
25. touch touch app/controllers/users_controller.rb 
26. Add to touch app/controllers/users_controller.rb
    - class UsersController < ApplicationController

        before_action :authenticate_user!
        before_action :find_user, only: %i[show]

        def index
            users = User.all
            render json: users
        end

        def show
            render json: @user
        end

        private

        def find_user
            @user = User.find(params[:id])
        end

    end

# Vue with vite
1. 
