import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

function SignIn() {
  const { setUser, setLoading, loading, user } = useAuth();
  const navigate = useNavigate();
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if(user){
      navigate("/", { replace: true });
    }
    const handleOtplessAuth = async (otplessUser) => {
      setLoading(true);
      try {
        const response = await api.post("/auth/user/signin", otplessUser);
        if(response.data.status === "SUCCESS") {
        setUser(response.data.user);
        navigate("/", { replace: true });
        toast.success('Sign In Successful ☺️');
        } else {
          console.log("Try again");
          toast.error('Sign In Failed, Ty again');
        }
      } catch (error) {
        console.error("Sign in failed:", error);
        setScriptError(true);
        toast.error(error.message || 'Sign In Failed 😒');
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
    return () =>{
      cleanup
      controller.abort();
    } ;
  }, [user]);

  // Render loading state with better UI
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
        <p className="text-lg">Failed to load authentication. Please try again.</p>
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
    
        <div id="otpless-login-page" className="w-full"></div>
    
  );
}

export default SignIn;



// const SignInPage = () => {
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const [activeStep, setActiveStep] = useState('mobile');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [countdown, setCountdown] = useState(30);
//   const [otplessInstance, setOtplessInstance] = useState(null);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://otpless.com/v4/headless.js';
//     script.async = true;
    
//     script.onload = () => {
//       if (window.OTPless) {
//         initializeOTPless();
//       }
//     };

//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   const initializeOTPless = () => {
//     const instance = new window.OTPless(callback);
//     setOtplessInstance(instance);
//   };

//   const callback = (eventCallback) => {
//     const ONETAP = () => {
//         const { response } = eventCallback;
//         const token = response.token;
//         // Implement your custom logic here.
//         console.log({token: response.token});
//     };

//     const OTP_AUTO_READ = () => {
//         const {
//             response: {otp}} = eventCallback;
//           setOtp(otp);
//         // console.log(otp);
//     }

//     const FAILED = () => {
//         const { response} = eventCallback;

//         console.log({response})
//     }

//     const FALLBACK_TRIGGERED = () => {
//         const {
//             response
//         } = eventCallback;

//         console.log({
//             response
//         })
//     }


//     const EVENTS_MAP = {
//         ONETAP,
//         OTP_AUTO_READ,
//         FAILED,
//         FALLBACK_TRIGGERED
//     }

//     if ("responseType" in eventCallback) EVENTS_MAP[eventCallback.responseType]();
// }

//   const phoneAuth = async () => {
//     await otplessInstance?.initiate({
//       channel: "PHONE",
//       phone: mobile,
//       countryCode: "+91", 
//     });
//   };

//   const verifyOTP = async () => {
//     await otplessInstance.verify({
//       channel: "PHONE",
//       phone: mobile,
//       otp: otp,
//       countryCode: "+91",
//     });
//     };
    

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!/^\d{10}$/.test(mobile)) {
//       setError('Please enter a valid 10-digit mobile number');
//       return;
//     }

//     setIsLoading(true);
//     // Simulate API call
//     phoneAuth();
//     setTimeout(() => {
//       setIsLoading(false);
//       setActiveStep('otp');
//       startCountdown();
//     }, 1000);
//   };

//   const handleSignIn = (e) => {
//     e.preventDefault();
    
//     if (otp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }
//   };

//   const startCountdown = () => {
//     let seconds = 30;
//     const interval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) clearInterval(interval);
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
//             INSTIFOOD
//           </h1>
//           <p className="mt-2 text-gray-600">Welcome back! Please sign in to continue</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         {/* Mobile Number Step */}
//         {activeStep === 'mobile' && (
//           <form onSubmit={handleSendOtp}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-2">Mobile Number</label>
//                 <input
//                   type="tel"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
//                   placeholder="Enter 10-digit mobile number"
//                   className="w-full p-3 border-2 border-orange-100 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all"
//                   maxLength={10}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white p-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-500 transition-all disabled:opacity-50 cursor-pointer"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Sending OTP...</span>
//                   </div>
//                 ) : (
//                   'Send OTP'
//                 )}
//               </button>
//             </div>
//           </form>
//         )}

//         {/* OTP Verification Step */}
//         {activeStep === 'otp' && (
//           <form onSubmit={handleSignIn}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-2">Enter OTP</label>
//                 <input
//                   type="tel"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                   placeholder="Enter 6-digit OTP"
//                   className="w-full p-3 border-2 border-orange-100 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all"
//                   maxLength={6}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white p-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-500 transition-all"
//                 onClick={verifyOTP}
//               >
//                 Sign In
//               </button>

//               <div className="text-center text-sm text-gray-600">
//                 {countdown > 0 ? (
//                   <span>Resend OTP in {countdown} seconds</span>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={startCountdown}
//                     className="text-red-500 hover:text-red-600 font-medium"
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setActiveStep('mobile')}
//                 className="w-full text-center text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
//               >
//                 ← Change Mobile Number
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignInPage;