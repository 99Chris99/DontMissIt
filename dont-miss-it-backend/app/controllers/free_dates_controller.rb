class FreeDatesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        freedates = FreeDate.all
        render json: freedates
    end

    def show
         
        date = FreeDate.find_by(id:params[:id])
        
        #date = FreeDate.dates_by_user(params[:id])
        
        if date
            render json: date
        else
            render json: { errors: ["Dates not found"] }, status: 403
        end
    end

    def create
        date = FreeDate.new(free_dates_params)
        if date.save
            render json: date
        else
            render json: { errors: date.errors.full_messages }, status: 403
        end
    end

    def destroy
       
        date = FreeDate.find(params[:id])

        if date
            date.destroy
            render json: date
        end

    end

    private

    def free_dates_params
        params.require(:free_date).permit(:user_id, :date, :id)
    end

    

end
