import Nav from "../nav";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleLoginButton from '../../../components/GoogleLoginButton';

// Reusable components
const InputField = ({ label, id, type, value, onChange, placeholder }) => (
  <div className="my-5">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
      placeholder={placeholder}
      required
    />
  </div>
);

const Divider = () => (
  <div className="flex items-center my-4 w-full max-w-md">
    <div className="flex-1 border-t border-gray-300"></div>
    <span className="px-4 text-gray-200">Or</span>
    <div className="flex-1 border-t border-gray-300"></div>
  </div>
);

const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://agroxsat.onrender.com/backend/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { access, refresh, user } = data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        navigate("/dashboard");
      } else {
        setError(data.error || "Error logging in");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network or server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-olive min-h-screen bg-hero-pattern bg-no-repeat bg-cover bg-center">
      <Nav />
      <div className="px-8 md:px-0 pb-8 flex flex-col justify-center items-center h-full">
        <div className="w-full md:w-1/3 2xl:w-1/4">
          <h1 className="text-5xl mb-14 font-semibold text-left text-white">
            Sign In
          </h1>
        </div>

        <form className="w-full md:w-1/3 2xl:w-1/4" onSubmit={handleSubmit}>
          <InputField
            label="Your Username"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="John Doe"
          />

          <InputField
            label="Your Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="•••••••••"
          />

          <div className="flex items-start mb-5">
            <div className="flex items-center justify-between h-5 w-full">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-earth bg-earth border-earth rounded focus:ring-earth dark:focus:ring-earth"
                />
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-white">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-white">
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`mb-4 text-white relative ${
              loading ? 'bg-olive' : 'bg-giants-orange hover:bg-blue-800'
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3.5 text-center`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
                <span>Granting Access...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {loading && (
            <div className="mt-4 text-white text-sm text-center animate-pulse">
              <p>🌱 Connecting to Agri X...</p>
            </div>
          )}

          <Divider />

          <div className="w-full max-w-md flex justify-center mb-4">
            <GoogleLoginButton />
          </div>

          <p className="font-medium text-white text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-black-olive font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
