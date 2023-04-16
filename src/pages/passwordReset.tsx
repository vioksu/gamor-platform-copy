import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import toast, { Toaster } from 'react-hot-toast';

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PasswordReset() {
  const [loading, setLoading] = useState(false)
  const { passwordReset } = useAuth()

  const resetFormSchema = z
    .object({
      email: z.string().email("Invalid email").min(1, "Email is required"),
    })

  type ResetFormSchemaType = z.infer<typeof resetFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormSchemaType>({
    resolver: zodResolver(resetFormSchema),
  });

  const onSubmit: SubmitHandler<ResetFormSchemaType> =  async ({ email }) => {
    try {
      setLoading(true);

      const { data, error } = await passwordReset(email);

      if (error) {
        console.log('Error :>> ', error);
      }

      toast.success('Password reset has been sent to your email')
    }
    catch (error) {
      console.log('Error :>> ', error);
      toast.error('Error in Resetting password')
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      {/* Notification */}
      <Toaster />

      <div className="container">
        {/* Logo */}
        <div className="register__logo">
          <Logo />
        </div>

        {/* Reset form */}
        <Card title="Login">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id='email'
                type='email'
                aria-label='Email'
                placeholder='name@company.com'
                {...register("email")}
              />
              {errors.email && (
                <span className="form-error">
                  {errors.email?.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={loading ? 'loading cta square' : 'cta square'}
            >
              {loading && (<Spinner />)} Send Reset Link
            </button>
          </form>

          {/* Login */}
          <span className="space-outer-1">
            Back to Login? <Link to={"/login"}>Login</Link>
          </span>
        </Card>
      </div>
    </div>
  );
};
