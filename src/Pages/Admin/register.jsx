import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/admin/register", formData);
      setMessage("Admin registered successfully!");
      setTimeout(() => {
        navigate("/admin-panel"); // Redirect to the admin panel
      }, 1000); // Delay for 1 second to show success message
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container login-form">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">Register Admin</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="button bt-ct-yellow w-100">Register</button>
              </form>
              {message && (
                <p
                  className={`mt-3 text-center ${
                    message.includes("successfully") ? "text-success" : "text-danger"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
