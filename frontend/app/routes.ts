import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/books.tsx"),
  route("/books/:bookId", "routes/book.tsx"),
  route("/login", "routes/login.tsx"),
  route("/sign-up", "routes/signup.tsx"),
  layout("components/wrappers/ProtectedRoute.tsx", [
    route("/my-books", "routes/myBooks.tsx"),
  ]),
] satisfies RouteConfig;
