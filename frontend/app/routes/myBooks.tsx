import type { Route } from "./+types/myBooks";
import MyBooksView from "../views/myBooks/MyBooks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Books" },
    { name: "My Books", content: "Page with rented books" },
  ];
}

export default function Home() {
  return <MyBooksView />;
}
