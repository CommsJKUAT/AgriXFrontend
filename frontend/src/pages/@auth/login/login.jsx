import Nav from "../nav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    setLoading(true); // Start loading

    try {
      console.log("Sending Request");
      const response = await fetch(
        "https://agrixcubesat.azurewebsites.net/backend/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response Status:", response.status);

      const contentType = response.headers.get("Content-Type");
      const responseBody = await response.json();

      if (response.ok) {
        console.log(
          "Access Token:",
          localStorage.getItem("accessToken")
        );
        console.log(
          "Username from localStorage:",
          localStorage.getItem("username")
        );
        console.log(
          "Email from localStorage:",
          localStorage.getItem("email")
        );
        const { access, refresh, user } = responseBody;
        console.log(responseBody);
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        navigate("/dashboard");
      } else {
        let errorMessage = "Error logging in";

        if (contentType && contentType.includes("application/json")) {
          const result = JSON.parse(responseBody);
          errorMessage = result.error || errorMessage;
        }

        setError(errorMessage);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Error logging in");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="relative bg-olive 2xl:h-screen bg-hero-pattern bg-no-repeat bg-cover">
      <Nav />
      <div className="px-8 md:px-0 pb-8 flex flex-col justify-center items-center h-full">
        <div className="w-full md:w-1/3 2xl:w-1/4">
          <h1 className="text-5xl mb-14 font-semibold text-left text-white">
            Sign In
          </h1>
        </div>
        <form
          className="w-full md:w-1/3 2xl:w-1/4"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
            placeholder="John Doe"
            required
          />
          <div className="my-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center justify-between h-5 w-full">
              <div className="flex items-center ">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-earth bg-earth border-earth rounded focus:ring-earth dark:focus:ring-earth"
                  required
                />
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-white"
                >
                  Remember me
                </label>
              </div>
              <a href="/" className="text-sm font-medium text-white">
                Forgot Password?
              </a>
            </div>
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button
            type="submit"
            className={`mb-4 text-white bg-giants-orange hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-3.5 text-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {loading && (
            <div className="flex justify-center mt-4">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l-3 3 3 3V4a8 8 0 11-8 8z"
                ></path>
              </svg>
            </div>
          )}
          {/* Remaining code for the Google and Apple buttons */}
          <p className="font-medium text-white">
            Don't have an account?{" "}
            <a href="/register" className="text-black-olive font-bold">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
