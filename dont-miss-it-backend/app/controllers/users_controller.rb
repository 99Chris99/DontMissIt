class UsersController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        users = User.all
        render json: users
    end
    
    def show
        user = User.find_by(id:params[:id])
        if user
            render json: user, include: [:free_dates, :favourites]
        else
            render json: { errors: ["Username not found"] }, status: 403
        end
    end

    def create
       
        user = User.new(username: params[:username])
        if user.save
            render json: user
        else
            render json: { errors: user.errors.full_messages }, status: 403
        end
    end

    private

    def user_params
        params.require(:user.permit(:username, :id))
    end

end
