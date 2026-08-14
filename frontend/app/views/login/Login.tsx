import React from "react";
import MainLayout from "~/layouts/MainLayout";

const Login = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-6xl text-blue-400 uppercase font-extrabold">
          library
        </h1>

        <h2 className="text-2xl">Log in</h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">email</label>
            <input id="email" name="email" type="text" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">password</label>
            <input id="password" name="password" type="password" />
          </div>

          <div className="flex flex-col gap-2 mt-4">
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
