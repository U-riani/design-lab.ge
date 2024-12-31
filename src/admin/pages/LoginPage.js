import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://design-lab-ten.vercel.app/admin/login",
        {
          username,
          password,
        }
      );

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        // Redirect using navigate
        navigate("/admin/"); // Change to your desired route
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container w-full h-screen bg-slate-100 relative flex items-center justify-center">
      <div className="w-fit h-fit bg-slate-300 rounded-lg px-3 py-2">
        <h1 className="text-center mb-3">Login Page</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center max-w-[300px]"
        >
          <div className="w-full flex flex-row items-center justify-between pb-3">
            <label className="pr-3" htmlFor="username">
              Username:{" "}
            </label>
            <input
            className="rounded-lg px-2 py-1"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <label htmlFor="password">Password:</label>
            <input
            className="rounded-lg px-2 py-1"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-fit mt-4 mb-2 bg-slate-100 px-3 pb-1 rounded-lg"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        <div className="w-[60%] flex">
          {error && <p className="error text-red-500 text-center">{error}</p>}
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
