import { useEffect, useState } from "react";
import axios from "axios";

function BookingList() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/bookings"
      );

      setBookings(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const cancelBooking = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      const res = await axios.delete(
        `http://localhost:5000/booking/${id}`
      );

      alert(res.data.message);

      loadBookings();

    } catch (err) {

      console.log(err);

    }

  };

  const filteredBookings = bookings.filter((item) =>
    item.student_name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container">

      <h1>Booking List</h1>

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Course</th>

            <th>Room</th>

            <th>Date</th>

            <th>Status</th>

            <th>Payment</th>

            <th>Attendance</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            filteredBookings.map((item) => (

              <tr key={item.id}>

                <td>{item.student_name}</td>

                <td>{item.email}</td>

                <td>{item.phone}</td>

                <td>{item.course}</td>

                <td>{item.room_no}</td>

                <td>
                  {
                    new Date(item.booking_date).toLocaleDateString()
                  }
                </td>

                <td>

                  {item.status || "Registered"}

                </td>

                <td>

                  {item.payment_status || "Pending"}

                </td>

                <td>

                  {item.attendance_status || "Not Marked"}

                </td>

                <td>

                  <button
                    onClick={() => cancelBooking(item.id)}
                  >
                    Cancel
                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default BookingList;