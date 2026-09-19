import type { Book } from "~/lib/types";
import type { Route } from "./+types/books";
import BooksView from "~/views/books/Books";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Books" }, { name: "Books", content: "A book list" }];
}

export const clientLoader = async (): Promise<{ data: Book[] }> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL_DEV}/books`);

  const books = await res.json();

  return books;
};

export const HydrateFallback = () => {
  return <p>Loading...</p>;
};

export default function Books({ loaderData }: Route.ComponentProps) {
  return <BooksView books={loaderData} />;
}
