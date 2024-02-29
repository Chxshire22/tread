"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

//Components Import

import {
  LoginButton,
  LogoutButton,
  SignUpButton,
} from "@/components/Buttons";

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
