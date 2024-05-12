import React, { useEffect, useState } from "react";
import BagsCounterSection from "./shared/BagsCounterSection";
import PersonalDetailsSection from "./shared/PersonalDetailsSection";
import CardDetailsSection from "./shared/CardDetailsSection";
import PriceDisplayAndSubmit from "./shared/PriceDisplayAndSubmit";
// import axios from "axios";

const BookingForm = () => {
  const [numberOfBags, setNumberOfBags] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState(10);
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState({} as any);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAll();
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

  const validateAll = () => {
    validateName();
    validateEmail();
    validateCardNumber();
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
    </div>
  );
};

export default BookingForm;
