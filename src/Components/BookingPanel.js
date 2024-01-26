import React from "react";

const BookingPanel = ({
  selectedSeats,
  totalPrice,
  onBookNow,
  handleNumOfSeatsToBook,
  numOfSeatsToBook,
}) => (
  <div className="booking-panel">
    <label>
      Number of seats to book:
      <input
        type="number"
        value={numOfSeatsToBook}
        onChange={handleNumOfSeatsToBook}
      />
    </label>
    <h2>Booking Details</h2>
    <ul>
      {selectedSeats.map((seat) => (
        <li key={seat.id}>Seat {seat.id}</li>
      ))}
    </ul>
    <p>Total Price: Rs{totalPrice}</p>
    <button onClick={onBookNow}>Book Now</button>
  </div>
);

export default BookingPanel;
