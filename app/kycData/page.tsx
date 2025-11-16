"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface KycDataType {
  _id: string;
  userId: string;
  businessName: string;
  title: string;
  gstNumber: string;
  plotNo: string;
  buildingName: string;
  street: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  businessType: string;
  businessAddress: string;
  businessArea: string;
  businessBuildingName: string;
  businessCity: string;
  businessLandmark: string;
  businessHoursOpen: string;
  businessHoursClose: string;
  personalAddress: string;
  personalArea: string;
  personalBuildingName: string;
  personalCity: string;
  personalLandmark: string;
  personalPincode: string;
  personalPlotNo: string;
  personalState: string;
  personalStreet: string;
  contactPerson: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  workingDays: string[];
  aadharNumber: string;
  aadharImage?: string;
  videoKyc?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface KycApiResponse {
  success: boolean;
  message: string;
  data: KycDataType[];
}

interface InfoItemProps {
  label: string;
  value: string | number | null | undefined;
}

export default function KycData() {
  const [data, setData] = useState<KycDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/kyc/my-kyc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await res.json() as KycApiResponse;
        if (result.data && result.data.length > 0) {
          setData(result.data[0]);
        } else {
          setData(null);
        } 

        if(result?.message === "Invalid or expired token."){
            router.push('/login')
            return;
        }

        if(result?.message === "Invalid or expired token."){
        }

        console.log(result, "data");
        console.log(data, "data-state");

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKyc();
  }, []);

  // useEffect(() => {
  //   console.log("Updated data:", data);
  // }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your KYC details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-xl">No KYC data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            KYC Dashboard
          </h1>
          <p className="text-gray-600">
            Your complete business verification details
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Business Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem label="Business Name" value={data?.businessName} />
              <InfoItem label="Title" value={data?.title} />
              <InfoItem label="GST Number" value={data?.gstNumber} />
              <InfoItem label="Plot No" value={data?.plotNo} />
              <InfoItem label="Building Name" value={data?.buildingName} />
              <InfoItem label="Street" value={data?.street} />
              <InfoItem label="Landmark" value={data?.landmark} />
              <InfoItem label="Area" value={data?.area} />
              <InfoItem label="City" value={data?.city} />
              <InfoItem label="State" value={data?.state} />
              <InfoItem label="Pincode" value={data?.pincode} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contact Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem label="Contact Person" value={data?.contactPerson} />
              <InfoItem label="Mobile Number" value={data?.mobileNumber} />
              <InfoItem label="WhatsApp Number" value={data?.whatsappNumber} />
              <InfoItem label="Email" value={data?.email} />
              <InfoItem
                label="Working Days"
                value={data?.workingDays?.join(", ")}
              />
              <InfoItem
                label="Business Hours"
                value={`${data?.businessHoursOpen} - ${data?.businessHoursClose}`}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                KYC Documents
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <InfoItem label="Aadhar Number" value={data?.aadharNumber} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data?.aadharImage && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Aadhar Document
                    </h3>
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.aadharImage}`}
                      alt="Aadhar"
                      className="w-full rounded-xl shadow-md border border-gray-200 py-16"
                    />
                  </div>
                )}

                {data.videoKyc && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Video KYC
                    </h3>
                    <video
                      controls
                      className="w-full rounded-xl shadow-md border border-gray-200"
                    >
                      <source src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.videoKyc}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Location Details
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoItem
                label="Latitude"
                value={data?.location?.coordinates?.[1]}
              />
              <InfoItem
                label="Longitude"
                value={data?.location?.coordinates?.[0]}
              />
            </div>
          </div>

          <div className="mt-4">
            <iframe
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${data?.location?.coordinates[1]},${data?.location?.coordinates[0]}&hl=es;z=14&output=embed`}
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base font-medium text-gray-900">{value || "N/A"}</p>
    </div>
  );
}
