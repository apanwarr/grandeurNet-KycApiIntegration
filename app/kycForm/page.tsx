"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessPopup from "../components/SuccessBox/SuccessBox";

export default function KycForm() {
    const [formData, setFormData] = useState({
        businessName: "",
        pincode: "",
        state: "",
        city: "",
        title: "",
        contactPerson: "",
        mobileNumber: "",
        email: "",
        workingDays: [] as string[],
        businessHoursOpen: "",
        businessHoursClose: "",
        aadharNumber: "",
        gstNumber: "",
        plotNo: "",
        buildingName: "",
        street: "",
        landmark: "",
        area: "",
        whatsappNumber: "",
        latitude: "",
        longitude: "",
        // videoKyc: "",
        // aadharImage: "",
    });
    const router = useRouter()
    const [aadharImage, setAadharImage] = useState<File | null>(null);
    const [videoKyc, setVideoKyc] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]:e.target.value})
    }

    const handleKycForm = async (e:any) => {
        e.preventDefault();
        setErrorMessage('');

        console.log(formData,'formdata')
        const token = localStorage.getItem('accessToken')
        console.log(token,'localStorageToken')

        const form = new FormData();
        for (const key of Object.keys(formData) as Array<keyof typeof formData>) {
            if (key === "workingDays") {
                form.append(key, JSON.stringify(formData[key]));
            } else {
                form.append(key, String(formData[key] ?? ""));
            }
        }

        console.log(typeof formData.gstNumber, formData.gstNumber);

        if (aadharImage) form.append("aadharImage", aadharImage);
        if (videoKyc) form.append("videoKyc", videoKyc);

        try {
            setLoading(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/kyc/submit`,
                form,
                {
                    headers: {
                        // "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(res?.data,'api-data')
            if(res?.data?.message === "Invalid or expired token."){
                router.push("/login")
                return;
            }
            router.push("/kycData")
        } catch (error) {
            console.log(error, 'error')
            setErrorMessage('KYC for this business name is already submitted and pending review')
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">
          Business KYC Form
        </h1>

        {errorMessage && (
            <p className="text-red-600 text-center bg-red-100 py-2 mb-1 rounded-lg">
                {errorMessage}
            </p>
        )}

        <form onSubmit={handleKycForm} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold mb-2 text-gray-700">Business Name</label>
                    <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    onChange={handleChange}
                    placeholder="Enter your business"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="pincode" className="block text-sm font-semibold mb-2 text-gray-700">Pincode</label>
                    <input
                    type="text"
                    name="pincode"
                    id="pincode"
                    onChange={handleChange}
                    placeholder="Enter your pincode"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="state" className="block text-sm font-semibold mb-2 text-gray-700">State</label>
                    <input
                    type="text"
                    id="state"
                    name="state"
                    onChange={handleChange}
                    placeholder="Enter your state"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2 text-gray-700">City</label>
                    <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">Title</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    placeholder="Enter title"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="contactPerson" className="block text-sm font-semibold mb-2 text-gray-700">Contact Person</label>
                    <input
                    type="text"
                    name="contactPerson"
                    id="contactPerson"
                    onChange={handleChange}
                    placeholder="Enter your contact"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-semibold mb-2 text-gray-700">Mobile Number</label>
                    <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    onChange={handleChange}
                    placeholder="Enter your number"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="aadharImage" className="block cursor-pointer text-sm font-semibold mb-2 text-gray-700">Image</label>
                    <input
                    type="file"
                    name="aadharImage"
                    onChange={(e) => {
                        const file = e?.target?.files?.[0];
                        if (file) {
                            setAadharImage(file);
                        }
                    }}
                    required
                    className="w-full cursor-pointer border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Video KYC</label>
                    <input
                        type="file"
                        accept="video/*"
                        name="videoKyc"
                        onChange={(e) => {
                            if (e?.target?.files && e?.target?.files?.length > 0) {
                                setVideoKyc(e?.target?.files[0]);
                            }
                        }}
                        required
                        className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="businessHoursOpen" className="block text-sm font-semibold mb-2 text-gray-700">Business Open Hours</label>
                    <input
                    type="text"
                    id="businessHoursOpen"
                    name="businessHoursOpen"
                    onChange={handleChange}
                    placeholder="Enter businessHoursOpen"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="businessHoursClose" className="block text-sm font-semibold mb-2 text-gray-700">Business Close Hours</label>
                    <input
                    type="text"
                    name="businessHoursClose"
                    id="businessHoursClose"
                    onChange={handleChange}
                    placeholder="Enter businessHoursClose"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="aadharNumber" className="block text-sm font-semibold mb-2 text-gray-700">Aadhar Number</label>
                    <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    onChange={handleChange}
                    placeholder="Enter your aadharNumber"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="gstNumber" className="block text-sm font-semibold mb-2 text-gray-700">Gst Number</label>
                    <input
                    type="text"
                    name="gstNumber"
                    id="gstNumber"
                    onChange={handleChange}
                    placeholder="Enter your gstNumber"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="plotNo" className="block text-sm font-semibold mb-2 text-gray-700">Plot No</label>
                    <input
                    type="text"
                    id="plotNo"
                    name="plotNo"
                    onChange={handleChange}
                    placeholder="Enter your plotNo"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="buildingName" className="block text-sm font-semibold mb-2 text-gray-700">Building Name</label>
                    <input
                    type="text"
                    name="buildingName"
                    id="buildingName"
                    onChange={handleChange}
                    placeholder="Enter your buildingName"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="street" className="block text-sm font-semibold mb-2 text-gray-700">Street</label>
                    <input
                    type="text"
                    id="street"
                    name="street"
                    onChange={handleChange}
                    placeholder="Enter your street"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="landmark" className="block text-sm font-semibold mb-2 text-gray-700">Landmark</label>
                    <input
                    type="text"
                    name="landmark"
                    id="landmark"
                    onChange={handleChange}
                    placeholder="Enter your landmark"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="area" className="block text-sm font-semibold mb-2 text-gray-700">Area</label>
                    <input
                    type="text"
                    id="area"
                    name="area"
                    onChange={handleChange}
                    placeholder="Enter your area"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-semibold mb-2 text-gray-700">Whatsapp Number</label>
                    <input
                    type="text"
                    name="whatsappNumber"
                    id="whatsappNumber"
                    onChange={handleChange}
                    placeholder="Enter your whatsappNumber"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="latitude" className="block text-sm font-semibold mb-2 text-gray-700">Latitude</label>
                    <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    onChange={handleChange}
                    placeholder="Enter your latitude"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="longitude" className="block text-sm font-semibold mb-2 text-gray-700">Longitude</label>
                    <input
                    type="text"
                    name="longitude"
                    id="longitude"
                    onChange={handleChange}
                    placeholder="Enter your longitude"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Working Days</label>
                <div className="flex gap-3 flex-wrap border p-4 rounded-lg border-gray-300 bg-white">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                    (day) => (
                        <label key={day} className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData?.workingDays.includes(day)}
                            onChange={(e) => {
                            if (e?.target?.checked) {
                                setFormData({
                                ...formData,
                                workingDays: [...formData?.workingDays, day],
                                });
                            } else {
                                setFormData({
                                ...formData,
                                workingDays: formData?.workingDays.filter((d) => d !== day),
                                });
                            }
                            }}
                            className="w-4 h-4 accent-purple-600 cursor-pointer"
                        />
                        <span className="text-sm font-medium">{day}</span>
                        </label>
                    )
                    )}
                </div>
            </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-400 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit KYC
          </button>
        </form>
      </div>

      {loading &&
        <SuccessPopup title="Please Wait!" message="Registering your data..." />
      }

    </div>
  );
}
