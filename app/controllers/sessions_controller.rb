class SessionsController < Devise::SessionsController
    respond_to :json
    
    private
    def respond_with(resource, _opts = {})
        # super { @token = current_token }
        render json: { 
            status: 200,
            message: 'Logged.',
            token: current_token
            # data: resource 
        }, status: :ok
    end
    def respond_to_on_destroy
        current_user ? log_out_success : log_out_failure
    end
    def log_out_success
        render json: { message: "Logged out." }, status: :ok
    end
    def log_out_failure
        render json: { message: "Logged out failure."}, status: :unauthorized
    end
    # Get token 
    def current_token
        request.env['warden-jwt_auth.token']
    end
end