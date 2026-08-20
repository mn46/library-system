import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { redirect } from "react-router";
import MainLayout from "~/layouts/MainLayout";

interface Inputs {
  email: string;
  password: string;
  repeatPassword: string;
}

const Signup: React.FC = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const postSignupMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_DEV}/create-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const body = await res.json();

      if (res.status === 400) {
        throw new Error(body?.message, { cause: 400 });
      }

      if (!res.ok) {
        throw new Error(
          body?.message ?? "An unknown error occured when signing up.",
          { cause: res.status },
        );
      }

      return body;
    },
    onSuccess: () => {
      redirect("/login");
    },
    onError: (error) => {
      if (error.cause === 400) {
        setError("email", { message: error.message });
      } else {
        setError("root.apiError", {
          type: String(error.cause),
          message: error.message,
        });
      }
    },
  });

  const handleSubmitSignup = (data: Inputs) => {
    postSignupMutation.mutate(data);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl text-blue-400 uppercase font-extrabold">
          library
        </h1>

        <h2 className="text-2xl">Sign up</h2>

        <form
          className="flex flex-col gap-4 w-62"
          onSubmit={handleSubmit(handleSubmitSignup)}
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

          <div className="flex flex-col gap-2">
            <label htmlFor="repeat-password">repeat password</label>
            <input
              id="repeat-password"
              type="password"
              {...register("repeatPassword", {
                required: "This field is required.",
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match.",
              })}
            />
            {errors.repeatPassword && (
              <p className="error-text">{errors.repeatPassword.message}</p>
            )}
          </div>

          {errors.root?.apiError && (
            <p className="error-text p-2 rounded-xl bg-red-200">
              {errors.root.apiError.message}
            </p>
          )}

          <button type="submit" className="button-primary mt-4">
            Sign up
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Signup;
