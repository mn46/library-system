import React from "react";
import { Outlet, redirect, useLoaderData } from "react-router";
import { getSession } from "~/lib/session";

export const clientLoader = async () => {
  const user = await getSession();

  if (!user) {
    throw redirect("/login");
  }

  return { user };
};

export const HydrateFallback = () => {
  return <p>Loading...</p>;
};

const ProtectedRoute: React.FC = () => {
  const { user } = useLoaderData<typeof clientLoader>();

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;
