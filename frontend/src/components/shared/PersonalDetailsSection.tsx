interface Props {
  name: string;
  setName: (name: string) => void;
  error: { name: string; email: string; cardNumber: string };
  email: string;
  setEmail: (email: string) => void;
}

const PersonalDetailsSection = ({
  name,
  setName,
  error,
  email,
  setEmail,
}: Props) => (
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
      {error && error.email && <p className="error-text">{error.email}</p>}
    </div>
  </div>
);

export default PersonalDetailsSection;
