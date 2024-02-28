import { getSession } from "@auth0/nextjs-auth0";

//Components Import
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import SignUpButton from "@/components/SignupButton";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <main>
      <div>
        <h1>HOME PAGE - Treads</h1>
        <p>Hi! {user?.email}</p>
      </div>
      <LoginButton />
      <LogoutButton />
      <SignUpButton />
    </main>
  );
}
