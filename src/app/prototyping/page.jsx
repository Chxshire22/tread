"use client";
import { CardImage } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import { useEffect, useState } from "react";

export default function CreateThreadsPage() {
  const [preview, setPreview] = useState(null);

  const [threadData, setThreadData] = useState({
    selectedImage: null,
    title: "",
    startDate: null,
    endDate: null,
    country: "",
  });

  useEffect(() => {
    console.log(threadData);
  }, [threadData]);
  const router = useRouter();

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(null);
      return;
    }
    setThreadData((prevState) => ({
      ...prevState,
      selectedImage: e.target.files[0],
    }));
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread" />
      <label htmlFor="file-upload" className="img-preview-placeholder ">
        {preview ? (
          <img src={preview} className="preview-img" alt="preview" />
        ) : (
          <>
            <CardImage size={40} /> <p>Upload Tread Picture</p>
          </>
        )}
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Select country */}
      <div className="my-3">
        <select
          className="form-select"
          aria-label="Country"
          onChange={(e) => {
            setThreadData((prevState) => ({
              ...prevState,
              country: e.target.value,
            }));
          }}
        >
          <option defaultValue={null} value="0">
            Select country
          </option>
          <option value="1">Map</option>
          <option value="2">Countries</option>
          <option value="3">Here</option>
        </select>
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
                startDate: e.target.value,
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
                endDate: e.target.value,
              }));
            }}
          />
          <label htmlFor="endDateInput">End date</label>
        </div>
      </div>

      <button type="submit" disabled={threadData.country == ""||threadData.title == "" || threadData.selectedImage ==null||threadData.startDate ==null||threadData.endDate == null? true: false} className="btn btn-submit-form">
        Post
      </button>
      {/* spacer is needed as navbar is sticky nad will block out the lowest elements on page */}
      <div className="spacer"></div>
    </div>
  );
}
