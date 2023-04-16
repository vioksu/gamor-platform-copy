import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { useAuth } from "./../context/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const loginFormSchema = z
    .object({
      email: z.string().email("Invalid email").min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
    })

  type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> =  async ({ email, password }) => {
    try {
      setLoading(true);

      const {
        data: { user, session },
        error
      } = await signIn(email, password);

      if (error) toast.error(error.message);
      if (user && session) navigate("/");
    }
    catch (error) {
      console.log('Error :>> ', error);
      toast.error('Email or Password Incorrect')
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {/* Notification */}
      <Toaster />

      <div className="container">
        {/* Logo */}
        <div className="login__logo">
          <Logo />
        </div>

        {/* Login Form */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={loading ? 'loading cta square' : 'cta square'}
            >
              {loading && (<Spinner />)} Login
            </button>
          </form>

          {/* Register */}
          <span className="space-outer-2">
            New User? <Link to={"/create-account"}>Create account</Link>
          </span>

          {/* Reset */}
          <span className="space-outer-1">
            Forgot your password? <Link to={"/password-reset"}>Reset the password</Link>
          </span>
        </Card>
      </div>
    </div>
  );
};
