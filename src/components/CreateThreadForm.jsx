"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardImage } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";


 // TO MOVE TO UTILS

  /**
   * This function optimizes an image by resizing it to a specified width while maintaining the aspect ratio.
   * The optimized image is then converted to a webp format with a quality of 80.
   * The function is asynchronous and returns a Promise that resolves with the Data URL of the optimized image.
   *
   * @param {File} file - The image file to be optimized.
   * @param {number} width - The desired width of the optimized image.
   * @returns {Promise<string>} A Promise that resolves with the Data URL of the optimized image.
   */
  export const imgOptimization = (file, width) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const dataUrl = e.target.result;

        const img = document.createElement("img");
        img.src = dataUrl;
        img.onload = (e) => {
          const canvas = document.createElement("canvas");
          const ratio = width / img.width;
          canvas.width = width;
          canvas.height = img.height * ratio;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          resolve(ctx.canvas.toDataURL("image/webp", 80));
        };
      };
      reader.onerror = (e) => {
        reject(e);
      };
    });
  };

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
      <div className="my-3 form-floating">
        <select
          className="form-select"
          aria-label="destination"
          id="floatingSelect"
          onChange={(e) => {
            setThreadData((prevState) => ({
              ...prevState,
              destination: e.target.value,
            }));
          }}
        >
          <option disabled selected value style={{ display: "none" }}></option>
          <option value="1">Map</option>
          <option value="2">Countries</option>
          <option value="3">Here</option>
        </select>
        <label htmlFor="floatingSelect">Destination</label>
      </div>
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