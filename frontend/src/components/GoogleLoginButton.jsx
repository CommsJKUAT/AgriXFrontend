import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (response) => {
    try {
      

      const res = await fetch('https://agroxsat.onrender.com/backendapi/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          token: response.access_token
        })
      });

      const data = await res.json();
      

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.access_token && data.refresh_token) {
        // Store tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('isAuthenticated', 'true');

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }


        navigate('/dashboard');
      } else {
        throw new Error('Missing authentication tokens in response');
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Authentication failed');
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      setError('Google authentication failed');
      console.error('Google Login Failed:', error);
    },
    scope: 'email profile',
  });

  return (
    <div>
      <button
        onClick={() => login()}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
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
        Continue with Google
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default GoogleLoginButton;