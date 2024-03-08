"use client";
import { HouseFill, Search, PersonCircle, ChatSquareFill } from "react-bootstrap-icons";
import Link from "next/link";
import navStyles from "../styles/navbar.module.css";
import { LoginButton } from "./Buttons";
import { useUserId } from "./GetCurrentUser";

const Navbar = () => {
  const { currentUser } = useUserId();
  const username = currentUser?.username;

  return (
    <nav className={navStyles.navcontainer}>
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
              {currentUser ? (
                <>
                  <li>
                    <a href={`/user/${username}`} className="dropdown-item">
                      My Profile
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href={`/user/${username}/pending-requests`}
                      className="dropdown-item"
                    >
                      Pending Requests
                    </a>
                  </li> */}
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
