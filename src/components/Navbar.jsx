import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      {/* To change words in navbar to icon in future */}
      {/* Routes not set up yet  */}
      <Link href="/">Home </Link>
      <Link href="/">Search </Link>
      <Link href="/">Post </Link>
      <Link href="/profile">Profile </Link>
    </nav>
  );
};

export default Navbar;
