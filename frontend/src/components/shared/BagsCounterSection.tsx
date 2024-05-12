interface Props {
  numberOfBags: number;
  addBag: () => void;
  removeBag: () => void;
}

const BagsCounterSection = ({ numberOfBags, addBag, removeBag }: Props) => (
  <div className="form-section">
    <div className="form-group form-inline">
      <label htmlFor="numberOfBags">Number of bags</label>
      <div className="number-of-bags">
        <button
          className={`square-button ${numberOfBags === 1 ? "disabled" : ""}`}
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
);

export default BagsCounterSection;
