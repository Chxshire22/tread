"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardImage } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { imgOptimization } from "@/utils/imageOptimization";

// TO MOVE TO UTILS

export default function CreateThreadForm() {
  const [preview, setPreview] = useState(null);

  const [threadData, setThreadData] = useState({
    threadsDp:
      "https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg",
    title: "",
    startDateOfTravel: null,
    endDateOfTravel: null,
    destination: "",
    userId: 1, //for now
  });

  const handleImageChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreview(null);
      return;
    }
    const file = e.target.files[0];

    let optimizedImg = await imgOptimization(file, 768);
    console.log(optimizedImg);
    setPreview(optimizedImg);
  };

  useEffect(() => {
    console.log(threadData);
  }, [threadData]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/threads",
        threadData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countries = [
    { value: 0, label: "United States" },
    { value: 1, label: "Canada" },
    { value: 2, label: "United Kingdom" },
    { value: 3, label: "Australia" },
    { value: 4, label: "Germany" },
    { value: 5, label: "France" },
    { value: 6, label: "Italy" },
    { value: 7, label: "Japan" },
    { value: 8, label: "Brazil" },
    { value: 9, label: "India" },
    { value: 10, label: "United States" },
    { value: 11, label: "Canada" },
    { value: 12, label: "United Kingdom" },
    { value: 13, label: "Australia" },
    { value: 14, label: "Germany" },
    { value: 15, label: "France" },
    { value: 16, label: "Italy" },
    { value: 17, label: "Japan" },
    { value: 18, label: "Brazil" },
    { value: 19, label: "India" },
  ];

  return (
    <div>
      {" "}
      <label htmlFor="file-upload" className="img-preview-placeholder ">
        {preview ? (
          <img src={preview} className="preview-img" alt="preview" />
        ) : (
          <>
            <CardImage size={40} /> <p>Upload Image</p>
          </>
        )}
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleImageChange}
      />
      {/* Select destination */}
      <Select
        name="country"
        options={countries}
        className="basic-single my-3 dropdown-package"
        maxMenuHeight={150}
        classNamePrefix="select"
        placeholder="Country"
        onChange={(e) => {
          setThreadData((prevState) => ({
            ...prevState,
            destination: e.label,
          }));
        }}
      />
      {/* Input title */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="titleInput"
          placeholder="Title"
          onChange={(e) => {
            setThreadData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
        />
        <label className="form-label" htmlFor="floatingPassword">
          Title
        </label>
      </div>
      {/* Input Dates */}
      <div className="start-end-input">
        <div className="form-floating mb-3 date-input">
          <input
            type="date"
            className="form-control"
            id="startDateInput"
            onChange={(e) => {
              setThreadData((prevState) => ({
                ...prevState,
                startDateOfTravel: e.target.value,
              }));
            }}
          />
          <label htmlFor="startDateInput">End date</label>
        </div>
        <div className="form-floating mb-3 date-input">
          <input
            type="date"
            className="form-control"
            id="endDateInput"
            onChange={(e) => {
              setThreadData((prevState) => ({
                ...prevState,
                endDateOfTravel: e.target.value,
              }));
            }}
          />
          <label htmlFor="endDateInput">End date</label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={
          threadData.destination == "" ||
          threadData.title == "" ||
          threadData.startDateOfTravel == null ||
          threadData.endDateOfTravel == null
            ? true
            : false
        }
        className="btn btn-submit-form"
      >
        Post
      </button>
    </div>
  );
}
