import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { GeoAlt } from "react-bootstrap-icons";

export default function ThreadContent({ threadContentId }) {
  const [threadContent, setThreadContent] = useState({});
  const userDp =
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  //get userDp from includes user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/threads-contents/${threadContentId}`);
        setThreadContent(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        marginBottom: "10px",
        backgroundColor: "white",
        padding: "10px",
        color: "black",
        width: "60vw",
        border: "1px solid black",
        margin: "1rem",
      }}
    >
      <Image src={userDp} width="50" height="50" alt="User Image" />
      <h4>
        <GeoAlt />
        {threadContent.location}{" "}
      </h4>
      <p>"{threadContent.description}"</p>{" "}
      {threadContent.recommendedTime && <p> Recommended Time: {threadContent.recommendedTime} </p>}
    </div>
  );
}
