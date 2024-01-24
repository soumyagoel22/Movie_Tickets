import React from "react";

const Seat = ({ id, status, onSelect }) => {
  const seatColor =
    status === "booked" ? "grey" : status === "selected" ? "green" : "white";

  return (
    <div
      className="seat"
      style={{ backgroundColor: seatColor }}
      onClick={() => onSelect(id)}
    />
  );
};

export default Seat;
