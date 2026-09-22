import type { Book } from "~/lib/types";
import type { Route } from "./+types/book";
import BookView from "~/views/book/Book";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Book" }, { name: "Book", content: "Book details" }];
}

export const clientLoader = async ({
  params,
}: Route.LoaderArgs): Promise<{ data: Book }> => {
  const { bookId } = params;
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL_DEV}/books/${bookId}`,
  );

  const book = await res.json();

  return book;
};

export const HydrateFallback = () => {
  return <p>Loading...</p>;
};

export default function Books({ loaderData }: Route.ComponentProps) {
  return <BookView data={loaderData} />;
}
