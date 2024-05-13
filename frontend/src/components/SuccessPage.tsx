const SuccessPage = () => {
  return (
    <div className="title-only">
      <h1>Booking Placed!</h1>
      <button onClick={() => (window.location.href = "/")}>Go Back</button>
    </div>
  );
};

export default SuccessPage;
