import Image from "next/image";
import { GeoAltFill } from "react-bootstrap-icons";
import { formatDate } from "@/utils/dateUtils";

export default function HeadThread({ thread }) {
  const threadDp =
    thread?.threadsDP ||
    "https://st.depositphotos.com/1008648/2313/i/380/depositphotos_23132682-stock-photo-travel-the-world-monuments-concept.jpg";

  return (
    <div
      onClick={() => (window.location.href = `/threads/${thread.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div>
        <div key={thread?.id} className="main-thread card text-center  ">
          <div className="card-header">
            <GeoAltFill className="GeoAlt" /> {thread?.destination}
          </div>
          <div className="card-body">
            <p className="card-title">
              <big>{thread?.title}</big>{" "}
            </p>
            <div style={{ position: "relative", height: "300px", width: "100%" }}>
              <Image src={threadDp} alt="threadsdp" layout="fill" objectFit="cover" />
            </div>
            <br />
          </div>
          <div className="card-footer ">
            {formatDate(thread?.startDateOfTravel)}
            {thread?.endDateOfTravel && <span> ✈️ {formatDate(thread.endDateOfTravel)}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
