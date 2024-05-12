interface Props {
  name: string;
  email: string;
  cardNumber: string;
  numberOfBags: number;
  price: number;
}

const PriceDisplayAndSubmit = ({
  name,
  email,
  cardNumber,
  numberOfBags,
  price,
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
      <button type="submit" disabled={!name || !email || !cardNumber}>
        Book
      </button>
    </div>
  </div>
);

export default PriceDisplayAndSubmit;
