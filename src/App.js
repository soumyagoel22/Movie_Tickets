import React, { useState } from "react";
import BookingPanel from "./Components/BookingPanel";
import Seat from "./Components/Seat";
import "./styles.css";

const App = () => {
  const [numOfSeatsToBook, setNumOfSeatsToBook] = useState(0);
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
    /* 
    TC = O(n * m)
    SC = o(n * m)
    */
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
    const newSeatStatus = [...seatStatus];
    const seatsToBook = findContinuousSeatsToBook();
    if (numOfSeatsToBook === 0) {
      alert("Booking Successful!");
      const newSeatStatusWithoutInput = seatStatus.map((row) =>
        row.map((status) => (status === "selected" ? "booked" : status)),
      );
      setSeatStatus(newSeatStatusWithoutInput);
      setSelectedSeats([]);
      setTotalPrice(0);
    } else if (seatsToBook.length >= numOfSeatsToBook) {
      seatsToBook.slice(0, numOfSeatsToBook).forEach(([row, col]) => {
        newSeatStatus[row][col] = "booked";
      });
      const bookedSeatIds = seatsToBook
        .slice(0, numOfSeatsToBook)
        .map(([row, col]) => generateSeatId(row, col));
      const updatedSelectedSeats = [
        ...selectedSeats,
        ...bookedSeatIds.map((id) => ({ id })),
      ];
      setSelectedSeats(updatedSelectedSeats);
      setTotalPrice(totalPrice + numOfSeatsToBook * 150);
      setNumOfSeatsToBook(0);
      setSeatStatus(newSeatStatus);
    } else {
      alert("Seats not available");
    }
  };

  const findContinuousSeatsToBook = () => {
    const seatsToBook = [];
    for (let row = 0; row < seatStatus.length; row++) {
      for (let col = 0; col < seatStatus[0].length; col++) {
        if (seatStatus[row][col] === "available") {
          seatsToBook.push([row, col]);
        } else {
          seatsToBook.length = 0;
        }
        if (seatsToBook.length === numOfSeatsToBook) {
          return seatsToBook;
        }
      }
    }
    return seatsToBook;
  };

  const handleNumOfSeatsToBook = (e) => {
    setNumOfSeatsToBook(e.target.value);
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
        handleNumOfSeatsToBook={handleNumOfSeatsToBook}
        numOfSeatsToBook={numOfSeatsToBook}
      />
    </div>
  );
};

export default App;
