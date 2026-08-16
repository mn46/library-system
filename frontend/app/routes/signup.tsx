import type { Route } from "./+types/signup";
import SignupView from "~/views/signup/Signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign up" },
    {
      name: "Sign up",
      content: "Create new user account in the Library System",
    },
  ];
}

export default function Signup() {
  return <SignupView />;
}
