import type { Route } from "./+types/home";
import LoginView from "~/views/login/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "Login", content: "Log in to the Library System" },
  ];
}

export default function Login() {
  return <LoginView />;
}
