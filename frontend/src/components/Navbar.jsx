import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar">

      <h2>🏨 Hostel Management</h2>

      <ul>

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/rooms">Rooms</Link>
        </li>

        <li>
          <Link to="/booking">Book Room</Link>
        </li>

        <li>
          <Link to="/bookings">Booking List</Link>
        </li>

        <li>
          <Link to="/payment">Payment</Link>
        </li>

        <li>
          <Link to="/attendance">Attendance</Link>
        </li>

        <li>
          <Link to="/food-menu">Food Menu</Link>
        </li>

        <li>
          <Link to="/food-request">Food Request</Link>
        </li>

        <li>
          <Link to="/medical">Medical</Link>
        </li>

        <li>
          <Link to="/complaint">Complaint</Link>
        </li>

        <li>
          <Link to="/profile">Student Profile</Link>
        </li>

      </ul>

    </nav>

  );

}

export default Navbar;