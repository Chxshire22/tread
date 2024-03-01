"use client";
//Components Import
import { LoginButton, SignUpButton, CreatePostButton } from "@/components/Buttons";
import { useUserId } from "@/components/GetCurrentUser";
import { getSession } from "@auth0/nextjs-auth0";

export default function Home() {
  const { currentUser } = useUserId();

  return (
    <main>
      <div>
        <h1>HOME PAGE - Treads</h1>
        {currentUser?.email && (
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
