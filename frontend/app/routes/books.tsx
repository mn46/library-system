import type { Route } from "./+types/books";
import BooksView from "~/views/books/Books";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Books" }, { name: "Books", content: "A book list" }];
}

export default function Login() {
  return <BooksView />;
}
