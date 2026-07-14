import { useEffect, useState } from "react";
import axios from "axios";

function BookingForm() {

  const [type, setType] = useState("Single");

  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    student_name: "",
    email: "",
    phone: "",
    course: "",
    room_no: ""
  });

  useEffect(() => {
    getRooms();
  }, [type]);

  const getRooms = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/rooms?type=${type}`
      );

      setRooms(
        res.data.filter(room => room.status === "Available")
      );

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const bookRoom = async (e) => {

    e.preventDefault();

    const confirmBooking = window.confirm(
      "Do you want to confirm your booking?"
    );

    if (!confirmBooking) return;

    try {

      const res = await axios.post(
        "http://localhost:5000/book",
        form
      );

      alert(
        "🎉 Thank You For Registering In Our Hostel.\n\n" +
        res.data.message
      );

      // Notification Save
      await axios.post(
        "http://localhost:5000/notification",
        {
          student_name: form.student_name,
          message:
            "Thank you for registering in our Hostel."
        }
      );

      setForm({
        student_name: "",
        email: "",
        phone: "",
        course: "",
        room_no: ""
      });

      getRooms();

    }

    catch (err) {

      console.log(err);

      alert("Booking Failed");

    }

  };

  return (

    <div className="container">

      <h1>Room Booking</h1>

      <form
        className="form"
        onSubmit={bookRoom}
      >

        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={form.student_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >

          <option>Single</option>
          <option>Double</option>
          <option>Triple</option>

        </select>

        <select
          name="room_no"
          value={form.room_no}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Room
          </option>

          {

            rooms.map(room => (

              <option
                key={room.id}
                value={room.room_no}
              >

                Room {room.room_no}

              </option>

            ))

          }

        </select>

        <button type="submit">

          Register Room

        </button>

      </form>

    </div>

  );

}

export default BookingForm;