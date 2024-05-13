import React, { useEffect, useState } from "react";
import BagsCounterSection from "./shared/BagsCounterSection";
import PersonalDetailsSection from "./shared/PersonalDetailsSection";
import CardDetailsSection from "./shared/CardDetailsSection";
import PriceDisplayAndSubmit from "./shared/PriceDisplayAndSubmit";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  name?: string[];
  email?: string[];
  card_number?: string[];
}

const BookingForm = () => {
  const [numberOfBags, setNumberOfBags] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState(10);
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState({} as any);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOverlayVisible(true);
    // Validate the form
    validateAll();

    // If there are errors, don't submit the form
    if (error.name || error.email || error.cardNumber) {
      return;
    }

    // Prepare the data to send
    const data = {
      name: name,
      email: email,
      card_number: cardNumber,
      number_of_bags: numberOfBags,
    };

    try {
      const response = await axios.post("http://localhost:3000/bookings", data);

      console.log(response.data); // Temporarily log the response
    } catch (serverError) {
      if (axios.isAxiosError(serverError)) {
        const axiosError = serverError as AxiosError;
        const responseErrorData = axiosError.response?.data as ErrorResponse;
        const flattenedErrors = {
          name: `Name ${responseErrorData.name?.join(", ")}`,
          email: `Email ${responseErrorData.email?.join(", ")}`,
          cardNumber: `Card # ${responseErrorData.card_number?.join(", ")}`,
        };

        setError({ ...error, ...flattenedErrors });
      } else {
        console.error("An unexpected error occurred:", serverError);
      }
    } finally {
      setOverlayVisible(false);
    }
  };

  const addBag = () => {
    setNumberOfBags(numberOfBags + 1);
  };

  const removeBag = () => {
    if (numberOfBags > 1) {
      setNumberOfBags(numberOfBags - 1);
    }
  };

  useEffect(() => {
    setPrice(10 * numberOfBags);
  }, [numberOfBags]);

  useEffect(() => {
    validateName();
  }, [name]);

  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    validateCardNumber();
  }, [cardNumber]);

  useEffect(() => {
    validateAll();
  }, []);

  const validateAll = () => {
    validateCardNumber();
    validateName();
    validateEmail();
  };

  const validateName = () => {
    if (!name.length) {
      setError({ ...error, name: "Name is required" });
    } else {
      setError({ ...error, name: null });
    }
  };

  const validateCardNumber = () => {
    const stripped = cardNumber.replace(/\s/g, "");
    if (!stripped.match(/^\d{16}$/)) {
      setError({
        ...error,
        cardNumber: "Invalid card number",
      });
    } else {
      setError({ ...error, cardNumber: null });
    }
  };

  const validateEmail = () => {
    if (email.length && !email.includes("@")) {
      setError({ ...error, email: "Invalid email" });
    } else {
      setError({ ...error, email: null });
    }
  };

  return (
    <div className="page container">
      <div className="page-header">
        <h2>Booking storage at:</h2>
        <h1>Vasco's Cookie Store</h1>
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <BagsCounterSection
          numberOfBags={numberOfBags}
          addBag={addBag}
          removeBag={removeBag}
        />
        <PersonalDetailsSection
          name={name}
          setName={setName}
          error={error}
          email={email}
          setEmail={setEmail}
        />
        <CardDetailsSection
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          error={error}
          setError={setError}
        />
        <PriceDisplayAndSubmit
          price={price}
          numberOfBags={numberOfBags}
          name={name}
          email={email}
          cardNumber={cardNumber}
        />
      </form>
      {overlayVisible && (
        <div className="overlay">
          <div className="overlay-content">Placing Booking...</div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
