"use client";
import { HouseFill, Search, PersonCircle, ChatSquareFill } from "react-bootstrap-icons";
import Link from "next/link";
import navStyles from "../styles/navbar.module.css";
import { LoginButton } from "./Buttons";
import { useUserId } from "./GetCurrentUser";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { currentUser } = useUserId();
  const username = currentUser?.username;
  const [unviewedCount, setUnviewedCount] = useState(0);

  useEffect(() => {
    const fetchUnviewedNotificationsCount = async () => {
      try {
        const response = await axios.get(`/api/notifications/${currentUser.id}`);
        const unviewed = response.data.filter((notification) => !notification.viewed);
        setUnviewedCount(unviewed.length);
      } catch (error) {
        console.error("Failed to fetch unviewed notifications count", error);
      }
    };

    if(currentUser)fetchUnviewedNotificationsCount();
  }, [currentUser]);

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
                  <li>
                    <a href={`/user/${username}/notifications`} className="dropdown-item">
                      Notifications{" "}
                      {unviewedCount > 0 ? (
                        <span className="notification-count">{unviewedCount}</span>
                      ) : null}
                    </a>
                  </li>
                  <li>
                    <a href={`/user/${username}/saved-threads`} className="dropdown-item">
                      Saved Threads
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
