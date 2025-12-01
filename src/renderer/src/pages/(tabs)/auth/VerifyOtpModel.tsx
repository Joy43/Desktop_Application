"use client";

import { useVerifyOTPMutation } from "@renderer/redux/features/auth/auth.api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOtpModal: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("verifyEmail");
    const resetToken = localStorage.getItem("resetToken");
    
    if (!storedEmail || !resetToken) {
      toast.error("Session expired. Please register again.");
      navigate("/auth/signup");
      return;
    }
    
    setEmail(storedEmail);
  }, [navigate]);

  const handleVerify = async () => {
    try {
      const resetToken = localStorage.getItem("resetToken");
      if (!resetToken) throw new Error("Missing resetToken");
      if (!email) throw new Error("Missing email");

      await verifyOTP({
        resetToken,
        emailOtp: otp,
      }).unwrap();

      toast.success("OTP verified successfully!");
      
      // Clean up localStorage
      localStorage.removeItem("resetToken");
      localStorage.removeItem("verifyEmail");
      
      setOtp("");
      
      // Navigate to login page
      navigate("/auth/login");
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "OTP verification failed"
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#113146] flex justify-center items-center px-4">
      {/* Modal Box */}
      <div className="w-full max-w-md bg-[#FAFDFF] p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-lg font-bold hover:text-gray-700"
          onClick={() => navigate("/auth/login")}
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-1">Verify Your Email</h2>
        <p className="text-sm text-gray-600">
          OTP has been sent to{" "}
          <span className="font-semibold">{email}</span>.
        </p>

        {/* OTP Input */}
        <div className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
            className="
              w-full bg-[#EDEFF0] py-3 px-4 text-center tracking-widest 
              outline-none border-none rounded-none
            "
          />

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="
              w-full bg-brick-red text-white py-2 
              border border-[#62180F] rounded-none
              hover:bg-[#7c2d22] transition
              disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed
            "
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Back to Login */}
          <p className="text-sm text-center">
            <span
              onClick={() => navigate("/auth/login")}
              className="text-brick-red font-semibold cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;