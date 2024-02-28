"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

//Components Import
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import SignUpButton from "@/components/SignupButton";

export default function Home() {
  const { user } = useUser();

  return (
    <main>
      <div>
        <h1>HOME PAGE - Treads</h1>
        {user && <p>Hi! {user.name}</p>}
      </div>
      <LoginButton />
      <LogoutButton />
      <SignUpButton />
    </main>
  );
}
