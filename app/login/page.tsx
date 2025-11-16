"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessPopup from "../components/SuccessBox/SuccessBox";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]:e.target.value})
    }

    const handleLogin = async (e:any) => {
        e.preventDefault();
        setErrorMessage("");

        console.log(formData,'formdata')

        try {
            setLoading(true)
            const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type" : "application/json",
                    }
                }
            )
            // console.log(data,"Login-Api-data")
            localStorage.setItem('accessToken',data?.data?.data?.accessToken)
            // console.log(data?.data?.data?.accessToken,'token')

            router.push("/kycForm")
        } catch (error) {
            console.log(error, 'error')
            setErrorMessage("Invalid credentials. Please try again.");
        } finally{
            setLoading(false)
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <div className="flex justify-center items-center mt-2">
            <h1>New User?</h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/")
              }}
              type="button"
              className="ml-2 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-400 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
            >
              Register
            </button>
            {/* <button onClick={() => router.push('/')} className="ml-2 cursor-pointer bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 mt-2">Register</button> */}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-center bg-red-100 py-2 rounded-lg">
                {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-400 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>

      {loading &&
        <SuccessPopup title="Logging In..." message="Checking the credentials"/>
      }

    </div>
  );
}
