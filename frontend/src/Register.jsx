import { useState } from "react";
import axios from "axios";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/register",
        user
      );

      alert(res.data.message);

      setUser({
        name: "",
        email: "",
        password: ""
      });

    } catch (err) {

      alert("Registration Failed");

    }

  };

  return (

    <div className="container">

      <h1>Student Registration</h1>

      <form className="form" onSubmit={register}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;