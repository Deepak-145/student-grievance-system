import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    if (!data.email || !data.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login success");
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <h3 className="text-center">Login</h3>

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

        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>

        <p className="mt-3 text-center">
          New user?{" "}
          <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}