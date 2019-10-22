class FavouritesController < ApplicationController

  skip_before_action :verify_authenticity_token


  def index
      favourites = Favourite.all
      render json: favourites
  end

  def show
      favourite = Favourite.find_by(favourite:params[:favourite])
      if favourite
          render json: favourite
      else
          render json: { errors: ["favourite not found"] }, status: 403
      end
  end

  def create
      favourite = Favourite.new(favourite_params)
      if favourite.save
          render json: favourite
      else
          render json: { errors: favourite.errors.full_messages }, status: 403
      end
  end

  def destroy

    favouriteAttraction = Favourite.find(params[:id])

    if favouriteAttraction
        favouriteAttraction.destroy
        render json: favouriteAttraction
    end

  end

  private

  def favourite_params
      params.require(:favourite).permit(:id, :user_id, :name, :tm_id)
  end

end
