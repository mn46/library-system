import type { Route } from "./+types/myBooks";
import MyBooksView from "../views/myBooks/MyBooks";
import type { Rental } from "~/lib/types";
import { getSession } from "~/lib/session";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Books" },
    { name: "My Books", content: "Page with rented books" },
  ];
}

export const clientLoader = async (): Promise<{ data: Rental[] }> => {
  const user = await getSession();

  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL_DEV}/user/${user}/rentals`,
    { credentials: "include", headers: { "Content-Type": "application/json" } },
  );

  const rentals = await res.json();

  return rentals;
};

export const HydrateFallback = () => {
  return <p>Loading...</p>;
};

export default function MyBooks({ loaderData }: Route.ComponentProps) {
  return <MyBooksView rentals={loaderData} />;
}
