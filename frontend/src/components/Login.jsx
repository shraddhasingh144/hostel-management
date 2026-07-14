import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const login = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        user
      );

      if (res.data.success) {

        alert("Login Successful");

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/");

      } else {

        alert("Invalid Email or Password");

      }

    } catch (err) {

      alert("Login Failed");

    }

  };

  return (

    <div className="container">

      <h1>Student Login</h1>

      <form className="form" onSubmit={login}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;