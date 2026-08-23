import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/sign-up", "routes/signup.tsx"),
  route("/books", "routes/books.tsx"),
  layout("components/wrappers/ProtectedRoute.tsx", [
    route("/my-books", "routes/myBooks.tsx"),
  ]),
] satisfies RouteConfig;
