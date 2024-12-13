import React, { useState } from "react";
import Nav from "../nav";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://agroxsat.onrender.com/backend/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Body:", result); // Log the full response

      if (response.ok) {
        alert("Registration successful");
        navigate("/");
      } else {
        // Handle errors returned from the backend
        if (result.error) {
          setErrorMessage(result.error);
        } else if (result.message) {
          setErrorMessage(result.message);
        } else if (result.detail) {
          setErrorMessage(result.detail);
        } else {
          setErrorMessage("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

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
          <div className="my-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          <div className="my-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
          </div>
          <div className="my-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5  placeholder-ash-gray"
                placeholder="•••••••••"
                required
              />
            </div>
          </div>
          <div className="my-5">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Repeat password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-white bg-black-olive text-sm rounded-lg focus:ring-black-olive focus:border-black-olive block w-full ps-2.5 p-3.5 placeholder-ash-gray"
                placeholder="•••••••••"
                required
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="mb-4 text-white bg-giants-orange hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-3.5 text-center"
          >
            Sign Up
          </button>
          <div className="my-5 flex flex-col">
            <p className="text-center text-white">Or continue with</p>
            <button
              type="button"
              className="my-4 text-black-olive bg-white focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 me-2 -ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.3-3.7 52.4-17.5 67.7-34.3z"
                />
              </svg>
              Continue with Apple
            </button>
            <button
              type="button"
              class="my-4 text-black-olive bg-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                className="me-2"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
          <p className="font-medium text-white">
            Already have an account?{" "}
            <a href="/" className=" text-black-olive font-bold">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
