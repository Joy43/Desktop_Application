"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod Schema
const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotSchemaType = z.infer<typeof forgotSchema>;

type ForgotModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ForgotPasswordModal: React.FC<ForgotModalProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotSchemaType) => {
    toast.success("Reset link sent successfully!");
    reset();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      {/* Modal Box */}
      <div className="w-full max-w-xl bg-[#FAFDFF] p-6 shadow-xl relative">

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-2xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-bold text-accent-orange text-center mb-1">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email to send the reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-none bg-[#EDEFF0] border-none shadow-none py-3 px-4 outline-none"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-brick-red hover:bg-[#7c2d22] text-white px-6 py-2 text-sm rounded-none border border-[#62180F] w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
