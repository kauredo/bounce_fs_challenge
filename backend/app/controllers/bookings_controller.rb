# frozen_string_literal: true

class BookingsController < ApplicationController
  def create
    @booking = Booking.new(booking_params)

    if @booking.save && rand(1..10) > 5 # fail 50% of the time
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:name, :email, :card_number, :number_of_bags)
  end
end
