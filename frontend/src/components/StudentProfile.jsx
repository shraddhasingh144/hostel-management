import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentProfile() {

  const [student, setStudent] = useState(null);


  useEffect(() => {

    getStudent();

  }, []);



  const getStudent = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/bookings"
      );


      if(res.data.length > 0){

        setStudent(res.data[0]);

      }


    } catch(err){

      console.log(err);

    }

  };



  return (

    <div className="container">

      <h2>Student Profile</h2>


      {
        student ?

        <>

        <p>
          <strong>Name :</strong> {student.student_name}
        </p>


        <p>
          <strong>Email :</strong> {student.email}
        </p>


        <p>
          <strong>Phone :</strong> {student.phone}
        </p>


        <p>
          <strong>Course :</strong> {student.course}
        </p>


        <p>
          <strong>Room No :</strong> {student.room_no}
        </p>


        <p>
          <strong>Booking Status :</strong> Registered
        </p>


        <p>
          <strong>Payment Status :</strong> Pending
        </p>


        </>


        :

        <p>
          No Student Data Found
        </p>

      }


    </div>

  );

}


export default StudentProfile;