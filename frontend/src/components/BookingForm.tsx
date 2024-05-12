import React, { useEffect, useState } from "react";
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
        <div className="form-section">
          <div className="form-group form-inline">
            <label htmlFor="numberOfBags">Number of bags</label>
            <div className="number-of-bags">
              <button
                className={`square-button ${
                  numberOfBags === 1 ? "disabled" : ""
                }`}
                type="button"
                onClick={removeBag}
                disabled={numberOfBags === 1}
              >
                -
              </button>
              <p>{numberOfBags}</p>
              <button className="square-button" type="button" onClick={addBag}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="form-section">
          <h2>Personal Details:</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              className={error && error.name ? "error-input" : ""}
              onChange={e => setName(e.target.value)}
            />
            {error && error.name && <p className="error-text">{error.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              className={error && error.email ? "error-input" : ""}
              onChange={e => setEmail(e.target.value)}
            />
            {error && error.email && (
              <p className="error-text">{error.email}</p>
            )}
          </div>
        </div>
        <div className="form-section">
          <h2>Payment Information:</h2>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Details</label>
            <input
              type="text"
              placeholder="1234 5678 1234 5678"
              value={cardNumber}
              className={error && error.cardNumber ? "error-input" : ""}
              onChange={e => setCardNumber(e.target.value)}
            />
            {error && error.cardNumber && (
              <p className="error-text">{error.cardNumber}</p>
            )}
          </div>
        </div>
        <div className="form-section price-section">
          <div className="form-group form-inline">
            <div>
              <p>
                <span className="small">
                  {numberOfBags} Bag{numberOfBags > 1 ? "s" : ""}
                </span>
              </p>
              <p className="price">${price}</p>
            </div>
            <button type="submit" disabled={!name || !email || !cardNumber}>
              Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
