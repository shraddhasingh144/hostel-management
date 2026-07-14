import React, { useState, useEffect } from "react";
import axios from "axios";

function MedicalEmergency() {

  const [medical, setMedical] = useState({
    student_name: "",
    room_no: "",
    emergency_type: "",
    description: "",
    contact_number: ""
  });


  const [medicalList, setMedicalList] = useState([]);


  useEffect(() => {
    getMedical();
  }, []);


  const getMedical = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/medical"
      );

      setMedicalList(res.data);

    } catch(err) {

      console.log(err);

    }

  };


  const handleChange = (e) => {

    setMedical({
      ...medical,
      [e.target.name]: e.target.value
    });

  };


  const submitEmergency = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/medical",
        medical
      );


      alert("Emergency Request Submitted");


      getMedical();


      setMedical({
        student_name:"",
        room_no:"",
        emergency_type:"",
        description:"",
        contact_number:""
      });


    } catch(err) {

      alert("Error");

    }

  };


  return (

    <div className="container">

      <h2>Medical Emergency</h2>


      <form onSubmit={submitEmergency}>


        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={medical.student_name}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="room_no"
          placeholder="Room Number"
          value={medical.room_no}
          onChange={handleChange}
          required
        />


        <select
          name="emergency_type"
          value={medical.emergency_type}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Emergency
          </option>

          <option>Fever</option>
          <option>Injury</option>
          <option>Breathing Problem</option>
          <option>Headache</option>
          <option>Other</option>

        </select>


        <textarea
          name="description"
          placeholder="Description"
          value={medical.description}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="contact_number"
          placeholder="Emergency Contact Number"
          value={medical.contact_number}
          onChange={handleChange}
          required
        />


        <button type="submit">
          Request Help
        </button>


      </form>


      <hr/>


      <h2>Medical Requests</h2>


      {
        medicalList.length === 0 ?

        <p>No Medical Request Found</p>

        :

        medicalList.map((item)=>(

          <div key={item.id}>

            <p>
              Name: {item.student_name}
            </p>

            <p>
              Room: {item.room_no}
            </p>

            <p>
              Emergency: {item.emergency_type}
            </p>

            <p>
              Description: {item.description}
            </p>

            <p>
              Contact: {item.contact_number}
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

export default MedicalEmergency;