import React from "react";

const BookingPanel = ({ selectedSeats, totalPrice, onBookNow }) => (
  <div className="booking-panel">
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
