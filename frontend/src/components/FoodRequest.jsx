import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodRequest() {

  const [request, setRequest] = useState({
    student_name: "",
    room_no: "",
    request_menu: "",
  });


  const [requests, setRequests] = useState([]);


  useEffect(() => {
    getRequests();
  }, []);


  const getRequests = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/food-request"
      );

      setRequests(res.data);

    } catch(err) {

      console.log(err);

    }

  };


  const handleChange = (e) => {

    setRequest({
      ...request,
      [e.target.name]: e.target.value
    });

  };


  const sendRequest = async (e) => {

    e.preventDefault();


    try {

      await axios.post(
        "http://localhost:5000/food-request",
        request
      );


      alert("Food Request Sent Successfully");


      getRequests();


      setRequest({
        student_name:"",
        room_no:"",
        request_menu:""
      });


    } catch(err) {

      alert("Error Sending Request");

    }

  };


  return (

    <div className="container">

      <h2>Food Request</h2>


      <form onSubmit={sendRequest}>


        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={request.student_name}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="room_no"
          placeholder="Room Number"
          value={request.room_no}
          onChange={handleChange}
          required
        />


        <textarea
          name="request_menu"
          placeholder="Example: Sunday ko Ice Cream add kare"
          value={request.request_menu}
          onChange={handleChange}
          required
        />


        <button type="submit">
          Send Request
        </button>


      </form>


      <hr/>


      <h2>Food Requests List</h2>


      {
        requests.length === 0 ?

        <p>No Requests Found</p>

        :

        requests.map((item)=>(

          <div key={item.id}>

            <p>
              Name: {item.student_name}
            </p>

            <p>
              Room: {item.room_no}
            </p>

            <p>
              Request: {item.request_menu}
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

export default FoodRequest;