require 'test_helper'

class BookingTest < ActiveSupport::TestCase
  # Test that a booking is valid with valid attributes
  test 'booking is valid with valid attributes' do
    booking = Booking.new(name: 'John Doe', email: 'john.doe@example.com', card_number: '1234567812345678', number_of_bags: 2)
    assert booking.valid?
  end

  # Test that a booking is not valid without a name
  test 'booking is not valid without a name' do
    booking = Booking.new(email: 'john.doe@example.com', card_number: '1234567812345678', number_of_bags: 2)
    assert_not booking.valid?
    assert_includes booking.errors[:name], "can't be blank"
  end

  # Test that a booking is not valid without an email
  test 'booking is not valid without an email' do
    booking = Booking.new(name: 'John Doe', card_number: '1234567812345678', number_of_bags: 2)
    assert_not booking.valid?
    assert_includes booking.errors[:email], "can't be blank"
  end

  # Test that a booking is not valid without a card number
  test 'booking is not valid without a card number' do
    booking = Booking.new(name: 'John Doe', email: 'john.doe@example.com', number_of_bags: 2)
    assert_not booking.valid?
    assert_includes booking.errors[:card_number], "can't be blank"
  end

  # Test that a booking is not valid without a number of bags
  test 'booking is not valid without a number of bags' do
    booking = Booking.new(name: 'John Doe', email: 'john.doe@example.com', card_number: '1234567812345678')
    assert_not booking.valid?
    assert_includes booking.errors[:number_of_bags], "can't be blank"
  end

  # Test that a booking is not valid if the number of bags is less than 1
  test 'booking is not valid if the number of bags is less than 1' do
    booking = Booking.new(name: 'John Doe', email: 'john.doe@example.com', card_number: '1234567812345678', number_of_bags: 0)
    assert_not booking.valid?
    assert_includes booking.errors[:number_of_bags], 'must be greater than or equal to 1'
  end
end
