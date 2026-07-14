import React, { useState, useEffect } from "react";
import axios from "axios";

function Complaint() {

  const [complaint, setComplaint] = useState({
    student_name: "",
    room_no: "",
    complaint: ""
  });


  const [complaintList, setComplaintList] = useState([]);


  useEffect(() => {
    getComplaints();
  }, []);


  const getComplaints = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/complaint"
      );

      setComplaintList(res.data);

    } catch(err) {

      console.log(err);

    }

  };


  const handleChange = (e) => {

    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value
    });

  };


  const submitComplaint = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/complaint",
        complaint
      );


      alert("Complaint Submitted Successfully");


      getComplaints();


      setComplaint({
        student_name:"",
        room_no:"",
        complaint:""
      });


    } catch(err) {

      alert("Error Submitting Complaint");

    }

  };


  return (

    <div className="container">

      <h2>Complaint</h2>


      <form onSubmit={submitComplaint}>


        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={complaint.student_name}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="room_no"
          placeholder="Room Number"
          value={complaint.room_no}
          onChange={handleChange}
          required
        />


        <textarea
          name="complaint"
          placeholder="Write your complaint"
          value={complaint.complaint}
          onChange={handleChange}
          required
        ></textarea>


        <button type="submit">
          Submit Complaint
        </button>


      </form>


      <hr/>


      <h2>Complaint List</h2>


      {
        complaintList.length === 0 ?

        <p>No Complaint Found</p>

        :

        complaintList.map((item)=>(

          <div key={item.id}>

            <p>
              Name: {item.student_name}
            </p>

            <p>
              Room: {item.room_no}
            </p>

            <p>
              Complaint: {item.complaint}
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

export default Complaint;