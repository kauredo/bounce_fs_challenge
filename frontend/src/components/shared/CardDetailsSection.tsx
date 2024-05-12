interface Props {
  cardNumber: string;
  setCardNumber: (cardNumber: string) => void;
  error: { name: string; email: string; cardNumber: string };
  setError: (error: { name: string }) => void;
}

const CardDetailsSection = ({ cardNumber, setCardNumber, error }: Props) => (
  <div className="form-section">
    <h2>Payment Information:</h2>
    <div className="form-group">
      <label htmlFor="cardNumber">Card Details</label>
      <input
        type="text"
        placeholder="1234 5678 1234 5678"
        value={cardNumber}
        name="cardNumber"
        className={error && error.cardNumber ? "error-input" : ""}
        onChange={e => setCardNumber(e.target.value)}
      />
      {error && error.cardNumber && (
        <p className="error-text">{error.cardNumber}</p>
      )}
    </div>
  </div>
);

export default CardDetailsSection;
