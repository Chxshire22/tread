import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { GeoAltFill } from "react-bootstrap-icons";

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card  tc-card-main">
      <img src={userDp} className="card-img tc-card-img" alt="..." />
      <div className="card-img-overlay">
        <h5 className="card-title">
          {" "}
          <GeoAltFill className="GeoAlt" />
          {threadContent.location}{" "}
        </h5>
        <p className="card-text">"{threadContent.description}"</p>
        <p className="card-text tc-time">
          <small>
            {threadContent.recommendedTime && (
              <p> Recommended Time: {threadContent.recommendedTime} </p>
            )}
          </small>
        </p>
      </div>
    </div>
  );
}
