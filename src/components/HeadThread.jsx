import Image from "next/image";
import { GeoAlt } from "react-bootstrap-icons";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeadThread({ thread, userDp, username }) {
  console.log(thread);
  const router = useRouter();
  // const userDpUrl = thread.user;
  // console.log(userDpUrl);
  const handleClick = () => {
    router.push(`/threads/${thread.id}`);
  };
  return (
    <div
      onClick={handleClick}
      style={{
        fontWeight: "bold",
        marginBottom: "20px",
        backgroundColor: "white",
        padding: "10px",
        margin: "1rem",
        color: "black",
        width: "80vw",
        height: "320px",
        border: "2px black solid",
      }}
    >
      <div style={{ display: "flex", padding: "5px" }}>
        {/* USER DP */}
        <Image width="50" height="50" alt="User Image" />
        {/* NAME */}
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          @{username}
        </div>
      </div>

      {/* TITLE */}
      <div style={{ textAlign: "center" }}> {thread?.title} </div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {/* THREAD DP */}
        <Image src={thread?.threadsDP} width="180" height="120" alt="" />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <GeoAlt />
        <p></p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <p>{formatDate(thread?.startDateOfTravel)}</p> ✈️
        {thread?.endDateOfTravel && <p>{formatDate(thread?.endDateOfTravel)} </p>}
      </div>
    </div>
  );
}
