import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    if (!data.name || !data.email || !data.password) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", data);
      alert("Registered successfully");
      navigate("/");
    } catch {
      alert("Email already exists");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <h3 className="text-center">Register</h3>

        <input
          className="form-control my-2"
          placeholder="Name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button className="btn btn-success w-100" onClick={submit}>
          Register
        </button>
      </div>
    </div>
  );
}