import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {

  const [data, setData] = useState({
    student_name: "",
    room_no: "",
    attendance_date: "",
    status: "Present",
  });


  const [attendanceList, setAttendanceList] = useState([]);


  useEffect(() => {
    getAttendance();
  }, []);


  const getAttendance = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/attendance"
      );

      setAttendanceList(res.data);

    } catch(err) {

      console.log(err);

    }

  };


  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };


  const saveAttendance = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/attendance",
        data
      );


      alert("Attendance Saved Successfully");


      getAttendance();


      setData({

        student_name:"",
        room_no:"",
        attendance_date:"",
        status:"Present"

      });


    } catch(err) {

      alert("Error Saving Attendance");

    }

  };


  return (

    <div className="container">

      <h2>Student Attendance</h2>


      <form onSubmit={saveAttendance}>


        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={data.student_name}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="room_no"
          placeholder="Room Number"
          value={data.room_no}
          onChange={handleChange}
          required
        />


        <input
          type="date"
          name="attendance_date"
          value={data.attendance_date}
          onChange={handleChange}
          required
        />


        <select
          name="status"
          value={data.status}
          onChange={handleChange}
        >

          <option>Present</option>
          <option>Absent</option>

        </select>


        <button type="submit">
          Save Attendance
        </button>


      </form>


      <hr/>


      <h2>Attendance Record</h2>


      {
        attendanceList.length === 0 ?

        <p>No Attendance Found</p>

        :

        attendanceList.map((item)=>(

          <div key={item.id}>

            <p>
              Name: {item.student_name}
            </p>

            <p>
              Room: {item.room_no}
            </p>

            <p>
              Date: {item.attendance_date}
            </p>

            <p>
              Status: {item.status}
            </p>

            <hr/>

          </div>

        ))
      }


    </div>

  );

}

export default Attendance;