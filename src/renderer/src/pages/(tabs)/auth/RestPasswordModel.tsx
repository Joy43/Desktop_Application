"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

// Zod Validation Schema
const resetSchema = z
  .object({
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordType = z.infer<typeof resetSchema>;

type ResetPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: ResetPasswordType) => {
    toast.success("Password reset successfully!");
    reset();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-[#FAFDFF] p-6 relative shadow-lg">

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-2xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-bold text-accent-orange text-center mb-1">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-5">
          Enter your new password to change the old one.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Password */}
          <div>
            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                className="w-full rounded-none mt-2 pr-10 bg-[#EDEFF0] border-none py-3 px-4 outline-none"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium">Re-enter Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              className="w-full rounded-none mt-2 bg-[#EDEFF0] border-none py-3 px-4 outline-none"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-brick-red hover:bg-[#7c2d22] text-white px-6 py-2 rounded-none border text-sm border-[#62180F] w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
