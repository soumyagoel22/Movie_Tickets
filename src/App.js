import React, { useState } from "react";
import BookingPanel from "./Components/BookingPanel";
import Seat from "./Components/Seat";
import "./styles.css";

const App = () => {
  const [seatStatus, setSeatStatus] = useState(
    Array(15)
      .fill(0)
      .map(() => Array(20).fill("available")),
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const generateSeatId = (row, col) => {
    const alphabet = "ABCDEFGHIJKLMNO";
    const alphabeticalRow = alphabet.charAt(alphabet.length - 1 - row);
    return `${alphabeticalRow}${col + 1}`;
  };

  const handleSeatClick = (id, row, col) => {
    const newSeatStatus = [...seatStatus];
    const currentStatus = newSeatStatus[row][col];

    if (currentStatus === "available") {
      newSeatStatus[row][col] = "selected";
      setSelectedSeats([...selectedSeats, { id }]);
      setTotalPrice(totalPrice + 150);
    } else if (currentStatus === "selected") {
      newSeatStatus[row][col] = "available";
      const updatedSelectedSeats = selectedSeats.filter(
        (seat) => seat.id !== id,
      );
      setSelectedSeats(updatedSelectedSeats);
      setTotalPrice(totalPrice - 150);
    }

    setSeatStatus(newSeatStatus);
  };

  const handleBookNow = () => {
    alert("Booking Successful!");
    const newSeatStatus = seatStatus.map((row) =>
      row.map((status) => (status === "selected" ? "booked" : status)),
    );
    setSeatStatus(newSeatStatus);
    setSelectedSeats([]);
    setTotalPrice(0);
  };

  return (
    <div className="movie-ticket-booking">
      <div className="seating-arrangement">
        {seatStatus.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((status, colIndex) => (
              <Seat
                key={colIndex}
                id={generateSeatId(rowIndex, colIndex)}
                status={status}
                onSelect={(id) => handleSeatClick(id, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <BookingPanel
        selectedSeats={selectedSeats}
        totalPrice={totalPrice}
        onBookNow={handleBookNow}
      />
    </div>
  );
};

export default App;
