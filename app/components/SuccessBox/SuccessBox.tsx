"use client";

interface SuccessPopupProps {
  title: string;
  message?: string;
}

export default function SuccessPopup({ title, message }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-green-600 mb-3">
          {title}
        </h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
