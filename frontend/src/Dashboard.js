import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hostel");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ useEffect ALWAYS at top (fixed)
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/grievances", {
          headers: { Authorization: token }
        });
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token]);

  // 🔒 Protected UI (after hooks)
  if (!token) {
    return <h3 className="text-center mt-5">Please login first</h3>;
  }

  // ➕ Submit grievance
  const submit = async () => {
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/grievances",
      { title, description, category },
      { headers: { Authorization: token } }
    );

    window.location.reload();
  };

  // ❌ Delete
  const del = async (id) => {
    await axios.delete(`http://localhost:5000/api/grievances/${id}`, {
      headers: { Authorization: token }
    });

    window.location.reload();
  };

  // 🔓 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔍 Search
  const filtered = list.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <button className="btn btn-danger mb-3" onClick={logout}>
        Logout
      </button>

      {/* Add Form */}
      <div className="card p-3 mb-3">
        <h5>Add Grievance</h5>

        <input
          className="form-control my-2"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        />

        <select
          className="form-control my-2"
          onChange={e => setCategory(e.target.value)}
        >
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <button className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </div>

      {/* Search */}
      <input
        className="form-control mb-3"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
      />

      {/* List */}
      <div className="row">
        {filtered.map(i => (
          <div className="col-md-4" key={i._id}>
            <div className="card p-3 shadow mb-3">
              <h5>{i.title}</h5>
              <p>{i.description}</p>
              <p><b>Status:</b> {i.status}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => del(i._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}