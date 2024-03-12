"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { GeoAltFill, NintendoSwitch } from "react-bootstrap-icons";
import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";

export default function HomePageThreads() {
  const [allThreadsArray, setAllThreadsArray] = useState([]);

  useEffect(() => {
    const fetchAllThreads = async () => {
      try {
        const response = await axios.get("/api/threads");
        setAllThreadsArray(response.data);
        console.log(response.data);
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
          <div
            style={{
              margin: "1rem",
              color: "black",
              border: "1px black solid",
            }}
            key={thread.id}
            className="card text-center"
          >
            <div className="card-header">
              <GeoAltFill />
              {thread.destination}
            </div>
            <div className="card-body">
              <p className="card-title">
                <strong>
                  <big>{thread.title}</big>
                </strong>{" "}
              </p>

              <Image
                src={thread.threadsDp || threadPlaceholderDp}
                alt="threadsdp"
                width={300}
                height={200}
              />
              <br />
              <a href={`/threads/${thread.id}`} className="btn btn-primary">
                @{thread.User.username}
              </a>
            </div>
            <div className="card-footer text-body-secondary">
              {formatDate(thread.startDateOfTravel)}
              {thread?.endDateOfTravel && <span> ✈️ {formatDate(thread.endDateOfTravel)}</span>}
            </div>
          </div>
        ))}
    </div>
  );
}
