"use client";

import { LoginButton, SignUpButton, CreatePostButton } from "@/components/Buttons";
import { useUserId } from "@/components/GetCurrentUser";

export default function Home() {
  const { currentUser } = useUserId();
  return (
    <main>
      <div>
        <h1>HOME PAGE - Treads</h1>
        {currentUser.email && (
          <p>
            Hey👋<strong>{currentUser.username} </strong>
          </p>
        )}
      </div>

      {!currentUser && (
        <>
          <LoginButton />
          <br />
          <SignUpButton />
        </>
      )}
      <CreatePostButton />
    </main>
  );
}
