require 'test_helper'

class BookingsControllerTest < ActionDispatch::IntegrationTest
  fixtures :bookings

  test 'should create a booking' do
    valid_booking = bookings(:valid)

    post bookings_path, params: { booking: valid_booking.attributes }

    assert_response :created
    assert_includes response.body, valid_booking[:name]
  end

  test 'should not create a booking with invalid parameters' do
    invalid_booking = bookings(:invalid)

    post bookings_path, params: { booking: invalid_booking.attributes }

    assert_response :unprocessable_entity

    errors = JSON.parse(response.body)
    assert_includes errors['name'], "can't be blank"
    assert_includes errors['email'], 'is invalid'
    assert_includes errors['card_number'], 'is the wrong length (should be 16 characters)'
    assert_includes errors['number_of_bags'], 'must be greater than or equal to 1'
  end
end
