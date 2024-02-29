"use client";

//Components Import
import { LoginButton, LogoutButton, SignUpButton } from "@/components/Buttons/Buttons";
import { useUserId } from "@/components/Context/GetCurrentUser";

export default function Home() {
  const { currentUser } = useUserId();
  return (
    <main>
      <div>
        <h1>HOME PAGE - Treads</h1>
        {currentUser.email && <h3>Hey👋 {currentUser.email}</h3>}
      </div>

      <SignUpButton />
      {!currentUser && (
        <>
          <LoginButton />
        </>
      )}
    </main>
  );
}
