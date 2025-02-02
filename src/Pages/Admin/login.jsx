import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    
    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("api/admin/login", formData); 
      const token = response.data.accessToken;
      navigate("/adminpanel");

      if (token) {
        localStorage.setItem("accessToken", token); 
        console.log(token)
        setLoading(false); 
        setFormData({ email: "", password: "" });   
        navigate("/adminpanel");
      } else {
        setError("Invalid login response. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false); 
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Clear the error when the user starts typing
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center" style={{ color: "#f5be32" }}>
          Login
        </h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: "white" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: "white" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#f5be32", color: "white" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* <p className="text-center mt-3 text-white">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#f5be32" }}>
            Signup
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
