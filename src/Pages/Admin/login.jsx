import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { AuthContext } from "../../context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/admin/login", formData);
      login(response.data.accessToken);
      setMessage("Login successful!");
      
      setTimeout(() => {
        navigate("/admin-panel");
      }, 1000); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="container login-form">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4 f-col-w">Login Admin</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label f-col-w">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label f-col-w">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="button bt-ct-yellow p-2  w-100">Login</button>
              </form>
              {message && (
                <p
                  className={`mt-3 text-center ${
                    message.includes("successful") ? "text-success" : "text-danger"
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

export default LoginPage;
