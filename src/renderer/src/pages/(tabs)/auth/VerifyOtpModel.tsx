"use client";

import { useVerifyOTPMutation } from "@renderer/redux/features/auth/auth.api";
import React, { useState } from "react";
import { toast } from "sonner";


type VerifyOtpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string | null;
};

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  open,
  onOpenChange,
  email,
}) => {
  const [otp, setOtp] = useState("");
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const handleVerify = async () => {
    try {
      const resetToken = localStorage.getItem("resetToken");
      if (!resetToken) throw new Error("Missing resetToken");
      if (!email) throw new Error("Missing email");

      const res = await verifyOTP({
        resetToken,
        emailOtp: otp,
      });

      toast.success("OTP verified successfully!");
      setOtp("");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "OTP verification failed"
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      {/* Modal Box */}
      <div className="w-full max-w-md bg-[#FAFDFF] p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-lg font-bold"
          onClick={() => onOpenChange(false)}
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
            onChange={(e) => setOtp(e.target.value)}
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
              disabled:bg-gray-400 disabled:border-gray-500
            "
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
