import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [data, setData] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    totalBookings: 0,
    totalPayments: 0,
    totalAttendance: 0,
    foodRequests: 0,
    medicalRequests: 0,
    complaints: 0
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/dashboard"
      );

      setData(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="container">

      <h1>🏨 Hostel Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>{data.totalRooms}</h2>
          <p>Total Rooms</p>
        </div>

        <div className="card">
          <h2>{data.availableRooms}</h2>
          <p>Available Rooms</p>
        </div>

        <div className="card">
          <h2>{data.bookedRooms}</h2>
          <p>Occupied Rooms</p>
        </div>

        <div className="card">
          <h2>{data.totalBookings}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="card">
          <h2>{data.totalPayments}</h2>
          <p>Payments</p>
        </div>

        <div className="card">
          <h2>{data.totalAttendance}</h2>
          <p>Attendance</p>
        </div>

        <div className="card">
          <h2>{data.foodRequests}</h2>
          <p>Food Requests</p>
        </div>

        <div className="card">
          <h2>{data.medicalRequests}</h2>
          <p>Medical Requests</p>
        </div>

        <div className="card">
          <h2>{data.complaints}</h2>
          <p>Complaints</p>
        </div>

      </div>

    </div>

  );

}

export default Dashboard;