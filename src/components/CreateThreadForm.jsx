"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CardImage } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { imgOptimization } from "@/utils/imageOptimization";
import Image from "next/image";
import { BACKEND_URL } from "@/app/constants";
import { ref as storageRef, getDownloadURL, uploadString } from "@firebase/storage";

import { storage, DB_STORAGE_THREAD_IMAGE_KEY } from "@/utils/firebase";
import { countries } from "countries-list";
import { useUserId } from "./GetCurrentUser";
// TO MOVE TO UTILS

export default function CreateThreadForm() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserId();

  const [threadData, setThreadData] = useState({
    title: "",
    startDateOfTravel: null,
    endDateOfTravel: null,
    destination: "",
    userId: currentUser?.id,
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
    setLoading(true);
    e.preventDefault();
    try {
      const sendThreadData = await axios.post(`${BACKEND_URL}api/threads`, threadData);
      const storageRefInstance = storageRef(
        storage,
        DB_STORAGE_THREAD_IMAGE_KEY +
          `${sendThreadData.data.id}/` +
          preview.split(",")[1].substring(4, 14)
      );

      if (preview) await uploadString(storageRefInstance, preview, "data_url");
      const imageSrc = preview ? await getDownloadURL(storageRefInstance) : null;
      await axios.put(`${BACKEND_URL}api/threads`, {
        ...threadData,
        id: sendThreadData.data.id,
        threadsDp: imageSrc,
      });
      setLoading(false);
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const countriesOptions = Object.entries(countries).map(([code, country], index) => ({
    value: index,
    label: country.name,
  }));

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
      <input type="file" id="file-upload" accept="image/*" onChange={handleImageChange} />
      {/* Select destination */}
      <Select
        name="country"
        options={countriesOptions}
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
          <label htmlFor="startDateInput">Start date</label>
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
          threadData.startDateOfTravel == null
            ? true
            : false
        }
        className="btn btn-submit-form"
      >
        {loading ? (
          <div
            className="spinner-border"
            style={{ width: "1.5rem", height: "1.5rem" }}
            role="status"
          ></div>
        ) : (
          `Post`
        )}
      </button>
    </div>
  );
}
