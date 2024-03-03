import React from "react";
import Image from "next/image";
import { GeoAlt } from "react-bootstrap-icons";

export default function HeadThread({ content }) {
  return (
    <div
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
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/1200px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg"
          width="50"
          height="50"
          alt="User Image"
        />
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Ben
        </div>
      </div>
      <div style={{ textAlign: "center" }}>Title: {content.title}</div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg/1280px-Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg"
          width="180"
          height="120"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <GeoAlt />
        <p>{content.destination}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <p>Start: {content.startDate}</p>
        <p>End: {content.endDate}</p>
      </div>
    </div>
  );
}
