"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { GeoAltFill, PersonCircle } from "react-bootstrap-icons";
import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";

export default function HomePageThreads() {
  const [allThreadsArray, setAllThreadsArray] = useState([]);

  useEffect(() => {
    const fetchAllThreads = async () => {
      try {
        const response = await axios.get("/api/threads");
        setAllThreadsArray(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllThreads();
  }, []);

  const threadPlaceholderDp =
    "https://st.depositphotos.com/1008648/2313/i/380/depositphotos_23132682-stock-photo-travel-the-world-monuments-concept.jpg";

  return (
    <div>
      {allThreadsArray
        .slice()
        .reverse()
        .map((thread) => (
          <div key={thread.id} className="main-thread card text-center  ">
            <div className="card-header">
              <GeoAltFill className="GeoAlt" /> {thread.destination}
            </div>
            <div
              className="card-body"
              onClick={() => (window.location.href = `/threads/${thread.id}`)}
              style={{ cursor: "pointer" }}
            >
              <p className="card-title">
                <big>{thread.title}</big>{" "}
              </p>
              <div style={{ position: "relative", height: "300px", width: "100%" }}>
                <Image
                  src={thread.threadsDp || threadPlaceholderDp}
                  alt="threadsdp"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <br />
              <a className="thread-username" href={`/user/${thread.User.username}`}>
                <PersonCircle className="personcircle" /> {thread.User.username}
              </a>
            </div>
            <div className="card-footer ">
              {formatDate(thread.startDateOfTravel)}
              {thread?.endDateOfTravel && <span> ✈️ {formatDate(thread.endDateOfTravel)}</span>}
            </div>
          </div>
        ))}
      <div className="spacer"></div>
    </div>
  );
}
