import type { Route } from "./+types/login";
import LoginView from "~/views/login/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Log in" },
    { name: "Log in", content: "Log in to the Library System" },
  ];
}

export default function Login() {
  return <LoginView />;
}
