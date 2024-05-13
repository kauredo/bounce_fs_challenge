import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import SuccessPage from "./components/SuccessPage";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<BookingForm />} />
            <Route path="success" element={<SuccessPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
