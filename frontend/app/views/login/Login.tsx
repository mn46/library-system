import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import MainLayout from "~/layouts/MainLayout";

interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const postLoginMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL_DEV}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (res.status === 401) {
        throw new Error(
          body?.message ?? "There was an issue with logging in.",
          { cause: 401 },
        );
      } else {
        throw new Error(
          body?.message ?? "An unknown error occured when logging in.",
          { cause: res.status },
        );
      }

      return body;
    },
    onError: (error) => {
      if (error.cause === 401) {
        setError("email", { message: error.message });
        setError("password", { message: error.message });
      } else {
        setError("password", { message: error.message });
      }
    },
  });

  const handleSubmitLogin = (data: Inputs) => {
    postLoginMutation.mutate(data);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl text-blue-400 uppercase font-extrabold">
          library
        </h1>

        <h2 className="text-2xl">Log in</h2>

        <form
          className="flex flex-col gap-4 w-62"
          onSubmit={handleSubmit(handleSubmitLogin)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="text"
              {...register("email", {
                required: "This field is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "This field is required.",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters long.",
                },
              })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-4 w-full">
            <button type="submit" className="button-primary">
              log in
            </button>

            <p className="text-center">or</p>

            <a href="/sign-up" className="button-secondary text-center">
              sign up
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
