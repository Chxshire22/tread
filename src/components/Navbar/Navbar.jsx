import { HouseFill, Search, PersonCircle, ChatSquareFill } from "react-bootstrap-icons";
import Link from "next/link";
import styles from "./styles.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import { LoginButton } from "../Buttons/Buttons";
const Navbar = async () => {
  const { user } = (await getSession()) || {};

  return (
    <nav className={styles.navcontainer}>
      <ul className="nav navlist justify-content-evenly w-100 ">
        <li className="nav-item">
          <Link className="nav-link active" href="/">
            <HouseFill size={25} color={"#AFD8F2"} />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/search">
            <Search size={25} color={"#AFD8F2"} />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/chat">
            <ChatSquareFill size={25} color={"#AFD8F2"} />
          </Link>
        </li>
        <li className="nav-item">
          <div className=" dropup nav-link">
            <div data-bs-toggle="dropdown" aria-expanded="false">
              <PersonCircle size={25} color={"#AFD8F2"} />
            </div>

            <ul className="dropdown-menu">
              {user ? (
                <>
                  <li>
                    <a href="/users" className="dropdown-item">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="/notifications" className="dropdown-item">
                      Notifications
                    </a>
                  </li>
                  <li>
                    <a href="/api/auth/logout" className="dropdown-item">
                      Log Out
                    </a>
                  </li>
                </>
              ) : (
                <LoginButton />
              )}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
