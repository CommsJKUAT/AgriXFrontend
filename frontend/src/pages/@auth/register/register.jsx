import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../nav";
import GoogleLoginButton from '../../../components/GoogleLoginButton';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://agroxsat.onrender.com/backend/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful");
        navigate("/");
      } else {
        setErrorMessage(
          result.error || result.message || result.detail || "Registration failed"
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, id, type, placeholder, value }) => (
    <div className="my-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={handleInputChange}
          className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );

  const Divider = () => (
    <div className="flex items-center my-4 w-full max-w-md">
      <div className="flex-1 border-t border-gray-300"></div>
      <span className="px-4 text-gray-200">Or</span>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  );

  return (
    <section className="relative bg-olive h-fit 2xl:h-screen bg-hero-pattern bg-no-repeat bg-cover">
      <Nav />
      <div className="px-8 md:px-0 pb-8 flex flex-col justify-center items-center h-full">
        <div className="w-full md:w-1/3 2xl:w-1/4">
          <h1 className="text-4xl 2xl:text-4xl mb-2 2xl:mb-14 font-semibold text-left text-white">
            Sign Up
          </h1>
        </div>

        <form className="w-full md:w-1/3 2xl:w-1/4" onSubmit={handleSubmit}>
          <InputField
            label="Username"
            id="username"
            type="text"
            placeholder="John Doe"
            value={formData.username}
          />
          <InputField
            label="Your Email"
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
          />
          <InputField
            label="Your password"
            id="password"
            type="password"
            placeholder="•••••••••"
            value={formData.password}
          />
          <InputField
            label="Repeat password"
            id="confirmPassword"
            type="password"
            placeholder="•••••••••"
            value={formData.confirmPassword}
          />

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`mb-4 text-white relative ${
              isLoading ? 'bg-olive' : 'bg-giants-orange hover:bg-blue-800'
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3.5 text-center`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
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
                <span>Please wait...</span>
              </div>
            ) : (
              'Sign Up'
            )}
          </button>

          <Divider />

          <div className="w-full max-w-md flex justify-center mb-4">
            <GoogleLoginButton />
          </div>

          <p className="font-medium text-white text-center">
            Already have an account?{" "}
            <Link to="/" className="text-black-olive font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
