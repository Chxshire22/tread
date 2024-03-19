import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { GeoAltFill } from "react-bootstrap-icons";
import CarouselTC from "@/components/Carousel";

export default function ThreadContent({ threadContentId, threadId }) {
  const [threadContent, setThreadContent] = useState({});
  const [threadContentDpArray, setThreadContentDpArray] = useState([]);

  //get userDp from includes user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/threads-contents/${threadContentId}`);
        const dpRes = await axios.get(`/api/threads-contents/display-pictures/${threadContentId}`);
        setThreadContent(response.data[0]);
        let arrayDp = [];
        if (dpRes.data.length > 0) {
          arrayDp = dpRes.data.map((dp) => dp.url);
        } else {
          arrayDp = [
            "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          ];
        }
        setThreadContentDpArray(arrayDp);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const carouselStyle = {
    marginBottom: "10px",
  };

  return (
    <div
      className="card tc-card-main"
      style={{
        width: "83vw",
        height: "30rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        border: "solid black 1px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <div style={{ ...carouselStyle, marginBottom: "15px" }}>
          <CarouselTC images={threadContentDpArray} />
        </div>
        <a href={`/threads/${threadId}/${threadContentId}/`}>
          <h5
            className="card-title"
            style={{
              color: "#333",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GeoAltFill className="GeoAlt" style={{ marginRight: "5px" }} />
            {threadContent.location}
          </h5>
          <p className="card-text" style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
            &quot;{threadContent.description}&quot;
          </p>
        </a>
      </div>
      {threadContent.recommendedTime && (
        <p
          className="card-text tc-time"
          style={{
            padding: "15px 20px",
            backgroundColor: "#e9ecef",
            borderTop: "1px solid #ddd",
            fontSize: "14px",
            color: "#666",
          }}
        >
          <small>Recommended Time: {threadContent.recommendedTime}</small>
        </p>
      )}
    </div>
  );
}
