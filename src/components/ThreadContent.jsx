import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { GeoAltFill } from "react-bootstrap-icons";
import Carousel from "@/components/Carousel";

export default function ThreadContent({ threadContentId }) {
  const [threadContent, setThreadContent] = useState({});
  const [threadContentDpArray, setThreadContentDpArray] = useState([]);

  //get userDp from includes user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/threads-contents/${threadContentId}`);
        const dpRes = await axios.get(`/api/threads-contents/display-pictures/${threadContentId}`);
        setThreadContent(response.data[0]);
        setThreadContentDpArray(dpRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const threadContentDP =
  //   threadContentDpArray[0]?.url ||
  //   "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  const threadContentDP =
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  const imgArr = [
    threadContentDpArray ||
      "https://media.cnn.com/api/v1/images/stellar/prod/230210161917-01-japan-never-traveler-culture-tokyo.jpg?c=original",
  ];

  const carouselStyle = {
    width: "60vw",
    margin: "10px",
  };

  return (
    <div className="card tc-card-main">
      {/* <img src={threadContentDP} className="card-img tc-card-img" alt="..." /> */}
      <div style={{ margin: "10px" }}>
        <h5 className="card-title">
          {" "}
          <GeoAltFill className="GeoAlt" />
          {threadContent.location}{" "}
        </h5>
        <p className="card-text">"{threadContent.description}"</p>
      </div>
      <div style={carouselStyle}>
        <Carousel images={imgArr} />
      </div>
      <p className="card-text tc-time">
        <small>
          {threadContent.recommendedTime && (
            <p> Recommended Time: {threadContent.recommendedTime} </p>
          )}
        </small>
      </p>
    </div>
  );
}
