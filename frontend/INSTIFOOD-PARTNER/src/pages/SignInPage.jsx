import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contextApi/authContext";
import { useNavigate } from "react-router-dom";
// import {toast} from 'react-toastify'

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function SignInPage() {
  const { setOwner, setLoading, loading, owner } = useAuth();
  const [scriptError, setScriptError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    if (owner) {
      navigate("/", { replace: true });
    }
    const handleOtplessAuth = async (otplessUser) => {
      setLoading(true);
      try {
        const response = await api.post("/auth/owner/signin", otplessUser);
        console.log(response.data);
        if (response.data.status === "SUCCESS") {
          setOwner(response.data.owner);
          navigate("/", { replace: true });
          // toast.success('Sign In Successful ☺️');
        } else {
          console.log("Try again");
          //   toast.error('Sign In Failed, Ty again');
        }
      } catch (error) {
        console.error("Sign in failed:", error);
        setScriptError(true);
        // toast.error(error.message || 'Sign In Failed 😒');
      } finally {
        setLoading(false);
      }
    };

    // Load OTPless script
    const loadOtplessScript = () => {
      const script = document.createElement("script");
      script.src = "https://otpless.com/v4/auth.js";
      script.async = true;
      script.onerror = () => setScriptError(true);

      // Only set window.otpless if it doesn't exist
      if (!window.otpless) {
        window.otpless = handleOtplessAuth;
      }

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        delete window.otpless;
      };
    };

    const cleanup = loadOtplessScript();
    return () => {
      cleanup;
      controller.abort();
    };
  }, []);

  //   Render loading state with better UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Render error state
  if (scriptError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
        <p className="text-lg">
          Failed to load authentication. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 rounded-md hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  // Main sign-in UI
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-gray/20 flex items-center justify-center p-4 z-60">
     <h1 className="text-5xl font-bold text-center mb-8 tracking-wider animate-pulse bg-gradient-to-r from-orange-600 via-red-500 to-rose-500 inline-block text-transparent bg-clip-text hover:scale-105 transition-transform duration-300 drop-shadow-lg">
      Welcome to INSTIFOOD Partner
    </h1>
      <div
        id="otpless-login-page"
        className="w-full max-w-md bg-white/80 dark:bg-slate-700/90 backdrop-blur-xl rounded-xl shadow-2xl p-8
               transform transition-all duration-300 hover:shadow-xl
               border border-white/20 dark:border-slate-700/30"
      ></div>
    </div>
    
  );
}

export default SignInPage;
