"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessPopup from "./components/SuccessBox/SuccessBox";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const router = useRouter();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpData, setOtpData] = useState({ email: "", otp: "" });
  const [loading, setLoading] = useState(false);   
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e: any) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("")

    if (formData?.password !== formData?.cpassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData, "formdata");

    try {
      setLoading(true); 
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res, "api-data");
      setOtpData({ email: formData.email, otp: "" });
      setShowOTPModal(true);
    } catch (error) {
      console.log(error, "error");
      setError("User with this email already exists")
    } finally {
      setLoading(false);  
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-otp`,
        otpData,
        { headers: { "Content-Type": "application/json" } }
      );

      // setShowOTPModal(false);
      // if(res?.data === ""){}
      // router.push("/login");
      if (res?.data?.success === true) {
        setShowOTPModal(false);
        setSuccessPopup(true); 

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Join us today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <div className="flex justify-center items-center gap-2 pb-2 border-gray-200">
            <span className="text-gray-600">Already have an account?</span>
            <button
              onClick={() => router.push("/login")}
              type="button"
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-400 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          {error && (
              <p className="text-red-600 text-center bg-red-100 py-2 mb-1 rounded-lg">
                  {error}
              </p>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="cpassword"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-400 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Register
          </button>
        </form>
      </div>

      {showOTPModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl transform animate-in">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-600">We sent an OTP to</p>
              <p className="text-green-600 font-semibold">{otpData?.email}</p>
            </div>

            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otpData.otp}
              onChange={handleOtpChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none mb-4 text-center text-lg tracking-widest font-semibold"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <SuccessPopup title="Registering New User..." message="Redirecting to login..." />
      )}

    </div>
  );
}
