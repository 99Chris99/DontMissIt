class FreeDatesController < ApplicationController

    def index
        freedates = FreeDate.all
        render json: freedates
    end

    def show
        date = FreeDate.find_by(date:params[:date])
        if date
            render json: date
        else
            render json: { errors: ["Username not found"] }, status: 403
        end
    end

    def create
        date = FreeDate.new(user_params)
        if date.save
            render json: date
        else
            render json: { errors: date.errors.full_messages }, status: 403
        end
    end

    private

    def user_params
        params.require(:date).permit(:date)
    end

    

end
