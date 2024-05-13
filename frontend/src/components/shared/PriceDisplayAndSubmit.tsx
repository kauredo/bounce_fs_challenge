interface Props {
  name: string;
  email: string;
  cardNumber: string;
  numberOfBags: number;
  price: number;
  error: { server: string };
}

const PriceDisplayAndSubmit = ({
  name,
  email,
  cardNumber,
  numberOfBags,
  price,
  error,
}: Props) => (
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

      <button
        type="submit"
        disabled={!name || !email || !cardNumber}
        className={`${error.server && "error"}`}
      >
        {error.server ? "Retry" : "Book"}
      </button>
    </div>
  </div>
);

export default PriceDisplayAndSubmit;
