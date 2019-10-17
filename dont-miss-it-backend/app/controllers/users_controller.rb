class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end
    
    def show
        user = User.find_by(username:params[:username])
        if user
            render json: user
        else
            render json: { errors: ["Username not found"] }, status: 403
        end
    end

    def create
        user = User.new(user_params)
        if user.save
            render json: user
        else
            render json: { errors: user.errors.full_messages }, status: 403
        end
    end

    private
    def user_params
        params.require(:username.permit(:username))
    end

end
