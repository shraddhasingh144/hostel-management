import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./components/Dashboard";
import Rooms from "./components/Rooms";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";

import Payment from "./components/Payment";
import Attendance from "./components/Attendance";
import FoodMenu from "./components/FoodMenu";
import FoodRequest from "./components/FoodRequest";
import MedicalEmergency from "./components/MedicalEmergency";
import Complaint from "./components/Complaint";
import StudentProfile from "./components/StudentProfile";

function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/booking"
          element={<BookingForm />}
        />

        <Route
          path="/bookings"
          element={<BookingList />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/food-menu"
          element={<FoodMenu />}
        />

        <Route
          path="/food-request"
          element={<FoodRequest />}
        />

        <Route
          path="/medical"
          element={<MedicalEmergency />}
        />

        <Route
          path="/complaint"
          element={<Complaint />}
        />

        <Route
          path="/profile"
          element={<StudentProfile />}
        />

      </Routes>

    </>

  );

}

export default App;