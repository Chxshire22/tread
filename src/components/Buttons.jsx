import styles from "../styles/buttons.module.css";
import Link from "next/link";
import { PlusCircleFill } from "react-bootstrap-icons";

export const LoginButton = () => {
  return (
    <button>
      <a href="/api/auth/login">Login</a>
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button>
      <a href="/api/auth/logout">Log Out</a>
    </button>
  );
};

export const SignUpButton = () => {
  return (
    <button>
      <a href="/api/auth/signup">Sign Up</a>
    </button>
  );
};


export function CreatePostButton() {
  return (
    <Link href="/create-thread" className="create-thread-btn">
      <PlusCircleFill color="#000066" size={40} />
    </Link>
  );
}


export const SaveContinue = () => {
  return <div>Buttons</div>;
};
