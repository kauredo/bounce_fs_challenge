# frozen_string_literal: true

class Booking < ApplicationRecord
  BAG_PRICE = 10

  # Validations
  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :card_number, presence: true, length: { is: 16 }
  validates :number_of_bags, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }

  def total_price
    number_of_bags * BAG_PRICE
  end
end
