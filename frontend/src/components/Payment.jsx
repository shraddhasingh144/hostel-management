import React, { useState } from "react";
import axios from "axios";

function Payment() {
  const [payment, setPayment] = useState({
    student_name: "",
    room_no: "",
    amount: "",
    payment_method: "UPI"
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const submitPayment = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/payment", payment);

      alert("Payment Successful!");

      setPayment({
        student_name: "",
        room_no: "",
        amount: "",
        payment_method: "UPI"
      });

    } catch (err) {
      console.log(err);
      alert("Payment Failed");
    }
  };

  return (
    <div className="container">

      <h2>Online Payment</h2>

      <form onSubmit={submitPayment}>

        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={payment.student_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="room_no"
          placeholder="Room Number"
          value={payment.room_no}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={payment.amount}
          onChange={handleChange}
          required
        />

        <select
          name="payment_method"
          value={payment.payment_method}
          onChange={handleChange}
        >
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cash">Cash</option>
        </select>

        <button type="submit">
          Pay Now
        </button>

      </form>

    </div>
  );
}

export default Payment;