import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import toast, { Toaster } from 'react-hot-toast';

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UpdatePassword() {
  const { updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updatePasswordFormSchema = z
    .object({
      email: z.string().email("Invalid email").min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  type UpdatePasswordFormSchemaType = z.infer<typeof updatePasswordFormSchema>;

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<UpdatePasswordFormSchemaType>({
      resolver: zodResolver(updatePasswordFormSchema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordFormSchemaType> =  async ({ password }) => {
    try {
      setLoading(true);

      const { data, error } = await updatePassword(password);

      if (!error) {
        navigate("/");
      }
    }
    catch (error) {
      console.log('Error :>> ', error);
      toast.error('Error in Updating Password. Please try again')
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-password">
      {/* Notification */}
      <Toaster />

      <div className="container">
        {/* Logo */}
        <div className="register__logo">
          <Logo />
        </div>

        {/* Update password form */}
        <Card title="Update Password">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Password */}
            <div className="form-group">
              <label htmlFor='password'>Password</label>
              <input
                id="password"
                type="password"
                aria-label="Password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <span className="form-error">
                  {errors.password?.message}
                </span>
              )}
            </div>

            {/* Confirm password */}
            <div className="form-group">
              <label htmlFor='confirm-password'>Confirm Password</label>
              <input
                id='confirmPassword'
                type="password"
                aria-label="Confirm Password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="form-error">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={loading ? 'loading cta square' : 'cta square'}
            >
              {loading && (<Spinner />)} Update
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
