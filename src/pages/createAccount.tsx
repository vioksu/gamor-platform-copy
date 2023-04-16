import { useState } from "react";
import { Link, redirect } from 'react-router-dom'
import Logo from "../components/Logo";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const registerFormSchema = z
    .object({
      email: z.string().email("Invalid email").min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
      // terms: z.literal(true, {
      //   errorMap: () => ({ message: "You must accept the terms and conditions" }),
      // }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<RegisterFormSchemaType>({
      resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormSchemaType> =  async ({ email, password }) => {
    try {
      setLoading(true);

      const { data, error } = await signUp(email, password);

      if (!error && data) {
        toast.success('Registration Successful. Check your email to confirm your account')
      }
    }
    catch (error) {
      console.log('Error :>> ', error);
      toast.error('Error in Creating Account')
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      {/* Notification */}
      <Toaster />

      <div className="container">
        {/* Logo */}
        <div className="register__logo">
          <Logo />
        </div>

        {/* Register form */}
        <Card title="Create and account">
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

            {/* Terms and Conditions */}
            {/* <div className="form-group">
              <div className="">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className=""
                  {...register("terms")}
                />
              </div>
              <div className="">
                <label htmlFor="terms">
                  I accept the{" "}
                  <a
                    className=""
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.terms && (
                <span className="form-error">
                  {errors.terms?.message}
                </span>
              )}
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={loading ? 'loading cta square' : 'cta square'}
            >
              {loading && (<Spinner />)} Create an account
            </button>
          </form>

          {/* Login */}
          <span className="space-outer-1">
            Already a User? <Link to="/login">Login</Link>
          </span>
        </Card>
      </div>
    </div>
  );
}
