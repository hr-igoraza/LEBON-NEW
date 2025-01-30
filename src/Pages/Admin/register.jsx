import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api"; // Import Axios instance

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const isPasswordValid = formData.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); 

    const isValidEmail = formData.email.includes("@");

    if (!isValidEmail) {
      setError("Please enter a valid email.");
      setLoading(false); 
      return;
    }

    if (!isPasswordValid) {
      setError("Password must be at least 8 characters long.");
      setLoading(false); 
      return;
    }

    try {
      const response = await API.post("api/admin/register", formData);
      const token = response.data.token; 
      localStorage.setItem("accessToken", token); 
      setMessage("Signup successful! Redirecting to admin panel...");
      setTimeout(() => {
        navigate("/adminpanel");
      }, 1000); 
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      // console.log(err);
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Clear error when the user starts typing
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center" style={{ color: "#f5be32" }}>
          Signup
        </h2>
        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label" style={{ color: "white" }}>
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
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
            />
            {!isPasswordValid && formData.password.length > 0 && (
              <small className="text-danger">Password must be at least 8 characters long.</small>
            )}
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#f5be32", color: "white" }}
            disabled={loading || !isPasswordValid} 
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
        <p className="text-center mt-3 text-white">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#f5be32" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
