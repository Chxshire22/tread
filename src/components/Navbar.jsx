import Link from "next/link";

import { getServerSession } from "next-auth";
import options from "../app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);
  return (
    <nav>
      {/* To change words in navbar to icon in future */}
      {/* Routes not set up yet  */}
      <Link href="/">Home </Link>
      <Link href="/">Search </Link>
      <Link href="/">Post </Link>
      <Link href="/profile">Profile </Link>
      {session ? (
        <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
      ) : (
        <Link href="/api/auth/signin?callbackUrl=/">Log In</Link>
      )}
    </nav>
  );
};

export default Navbar;
